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
async def gemini_call(user_question: str, unified_json: dict, mode: str = "knowledge") -> dict:
    """
    Gemini SQL/Knowledge assistant. In database mode, always generate a valid SQL query using ONLY the tables and columns provided in the SCHEMA_JSON. Return ONLY the SQL query, nothing else. In knowledge mode, answer using the knowledge base JSON.
    """
    try:
        if mode == "database":
            instructions = (
                "You are a SQL query generator for a PostgreSQL database. "
                "Always generate a valid SQL query using ONLY the tables and columns provided in the SCHEMA_JSON. "
                "Use ILIKE for text/varchar search and ::text ILIKE for JSONB search. "
                "Return ONLY the SQL query, nothing else. "
                "If you cannot answer, return a SQL SELECT statement that would be valid for the schema."
            )
            message = {
                "role": "user",
                "parts": [
                    {"text": instructions},
                    {"text": f"SCHEMA_JSON:\n{json.dumps(unified_json, indent=2)}"},
                    {"text": f"USER_QUESTION:\n{user_question}"}
                ]
            }
            response = await model.generate_content_async([message])
            if not response.candidates or not response.candidates[0].content.parts:
                return {"results": [], "explanation": "", "sql": ""}
            sql = response.candidates[0].content.parts[0].text.strip()
            # Remove code block if present
            if sql.startswith("```sql"):
                sql = sql[6:].strip()
            if sql.endswith("```"):
                sql = sql[:-3].strip()
            if not sql.lower().startswith(("select", "with", "insert", "update", "delete")):
                return {"results": [], "explanation": "", "sql": sql}
            rows = await run_sql(sql)
            return {"results": rows, "explanation": sql, "sql": sql}
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
                return {"results": [], "explanation": ""}
            clean_response = response.candidates[0].content.parts[0].text.strip()
            return {"results": [clean_response], "explanation": clean_response}
    except Exception as e:
        logging.error(f"Gemini Error: {str(e)}\n{traceback.format_exc()}")
        return {"results": [], "explanation": f"Error: {str(e)}"}

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
