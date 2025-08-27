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
# Gemini Call
# -------------------------------
async def gemini_call(query: str, unified_json: dict, mode: str = "knowledge") -> Union[str, Dict[str, Any]]:
    try:
        if mode == "database":
            instructions = (
                "You are StartupTN Assistant specialized in database queries. Rules:\n"
                "1. Generate precise SQL queries using only snake_case field names.\n"
                "2. Return ONLY the SQL query (no explanations, no markdown).\n"
                "3. Ensure field names exist in schema.\n"
                "4. Use JOINs and WHERE clauses if necessary.\n"
                "5. Optimize queries for performance."
            )
        else:
            instructions = (
                "You are StartupTN Assistant for knowledge retrieval. Rules:\n"
                "1. Always use the provided KNOWLEDGE_BASE JSON.\n"
                "2. For registration/application queries, check 'programs -> TANFUND -> wizard'.\n"
                "3. List required fields step by step with relevant URLs from 'urls_hint'.\n"
                "4. For ecosystem queries, use 'ecosystem' section.\n"
                "5. Always answer clearly with actionable steps.\n"
                "6. Include all relevant URLs from JSON.\n"
                "7. Never refuse to answer."
            )

        message = {
            "role": "user",
            "parts": [
                {"text": instructions},
                {"text": "CONTEXT_VERSION: 2.5"},
                {"text": f"KNOWLEDGE_BASE:\n{json.dumps(unified_json, indent=2)}"},
                {"text": "QUERY_DELIMITER_START"},
                {"text": query},
                {"text": "QUERY_DELIMITER_END"}
            ]
        }

        response = await model.generate_content_async([message])

        if not response.candidates or not response.candidates[0].content.parts:
            return "Error: Empty response from Gemini"

        clean_response = response.candidates[0].content.parts[0].text.strip()

        if mode == "database":
            if not clean_response.lower().startswith(("select", "with", "insert", "update", "delete")):
                return "Error: Invalid SQL generated"
            return clean_response

        return clean_response

    except Exception as e:
        error_msg = f"Gemini Error: {str(e)}"
        logging.error(f"{error_msg}\n{traceback.format_exc()}")
        return error_msg

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
        return [{"error": str(e), "query": query}]
