import google.generativeai as genai
import json
import traceback
import logging
import asyncpg
import os
from typing import Union, Dict, Any, List
from dotenv import load_dotenv

load_dotenv()

# -------------------------------
# Gemini 2.5 Flash Configuration
# -------------------------------
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

# -------------------------------
# Supabase PostgreSQL Connection
# -------------------------------
DATABASE_URL = os.getenv("SUPABASE_DB_URL")
if not DATABASE_URL:
    raise ValueError("❌ Missing SUPABASE_DB_URL in .env file")

# -------------------------------
# Run SQL on Supabase PostgreSQL
# -------------------------------
async def run_sql(query: str) -> List[Dict[str, Any]]:
    try:
        conn = await asyncpg.connect(DATABASE_URL)
        try:
            rows = await conn.fetch(query)
            return [dict(row) for row in rows]
        finally:
            await conn.close()
    except Exception as e:
        logging.error(f"SQL Execution Error: {e}\n{traceback.format_exc()}")
        return [{"error": str(e)}]

# -------------------------------
# Gemini Call (Dual Mode: database / knowledge)
# -------------------------------
async def gemini_call(user_question: str, unified_json: dict, mode: str = "knowledge") -> Dict[str, Any]:
    """
    Dual-mode Gemini assistant:
    - 'database' mode: generate SQL, execute in backend, return results + explanation.
    - 'knowledge' mode: answer questions using knowledge base JSON.
    """
    try:
        if mode == "database":
            # Database instructions
            instructions = (
                "You are StartupTN Assistant specialized in database queries.\n"
                "Rules:\n"
                "1. Generate precise SQL queries using only snake_case field names from the provided schema.\n"
                "2. Never return the SQL query itself to the user.\n"
                "3. Execute the SQL query in the backend.\n"
                "4. Return only:\n"
                "   a) A human-readable explanation of what the query does.\n"
                "   b) The query results as JSON.\n"
                "5. Use JOINs and WHERE clauses if necessary.\n"
                "6. Optimize queries for performance.\n"
            )
        else:
            # Knowledge mode instructions
            instructions = (
                "You are StartupTN Assistant specialized in knowledge retrieval.\n"
                "Rules:\n"
                "1. Always use the provided KNOWLEDGE_BASE JSON.\n"
                "2. For registration/application queries, check 'programs -> TANFUND -> wizard'.\n"
                "3. List required fields step by step with relevant URLs from 'urls_hint'.\n"
                "4. For ecosystem queries, use 'ecosystem' section.\n"
                "5. Always answer clearly with actionable steps.\n"
                "6. Include all relevant URLs from JSON.\n"
                "7. Never refuse to answer.\n"
            )

        message = {
            "role": "user",
            "parts": [
                {"text": instructions},
                {"text": "CONTEXT_VERSION: 2.5"},
                {"text": f"KNOWLEDGE_BASE:\n{json.dumps(unified_json, indent=2)}"},
                {"text": "USER_QUESTION:\n" + user_question}
            ]
        }

        response = await model.generate_content_async([message])

        if not response.candidates or not response.candidates[0].content.parts:
            return {"error": "Empty response from Gemini"}

        clean_response = response.candidates[0].content.parts[0].text.strip()

        if mode == "database":
            # Extract SQL query internally (assumes AI outputs SQL)
            sql_query = None
            for line in clean_response.splitlines():
                if line.strip().lower().startswith(("select", "with", "insert", "update", "delete")):
                    sql_query = line.strip()
                    break

            if not sql_query:
                return {"error": "AI did not generate a valid SQL query", "raw_response": clean_response}

            # Execute SQL in backend
            rows = await run_sql(sql_query)

            # Ask Gemini to summarize results in human-readable explanation
            explanation_prompt = (
                "You are StartupTN Assistant. Explain in simple human-readable terms "
                "what this SQL query does and summarize the key results for the user.\n"
                f"Query results (JSON): {json.dumps(rows, indent=2)}"
            )
            explanation_message = {"role": "user", "parts": [{"text": explanation_prompt}]}

            explanation_response = await model.generate_content_async([explanation_message])
            explanation_text = explanation_response.candidates[0].content.parts[0].text.strip()

            return {
                "results": rows,
                "explanation": explanation_text
            }

        else:
            # Knowledge mode: return AI response directly
            return {
                "answer": clean_response
            }

    except Exception as e:
        logging.error(f"Gemini Error: {str(e)}\n{traceback.format_exc()}")
        return {"error": str(e)}

# -------------------------------
# Example Usage
# -------------------------------
# import asyncio
# schema_json = {...}  # Your database schema JSON here
# knowledge_json = {...}  # Your knowledge base JSON here
# user_question = "Show me all Seed Fund schemes"
# result = asyncio.run(gemini_call(user_question, schema_json, mode="database"))
# print(json.dumps(result, indent=2))

# user_question2 = "How do I register for TANFUND?"
# result2 = asyncio.run(gemini_call(user_question2, knowledge_json, mode="knowledge"))
# print(json.dumps(result2, indent=2))
