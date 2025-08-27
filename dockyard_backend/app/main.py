import json
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.api import prompt
from app.utils.ai_db_utils import gemini_call, run_sql
import traceback
from app.core.startup_tn_knowledge_base import startup_tn_knowledge_base
from app.core.db_schema import db_schema
class QueryRequest(BaseModel):
	query: str

app = FastAPI()

app.include_router(prompt.router, prefix="/api")

# Keywords for mode detection
DB_KEYWORDS = ["revenue", "sector", "list", "show", "funding", "startups"]
KNOWLEDGE_KEYWORDS = ["how", "register", "apply", "upload", "steps"]

def detect_mode(query: str) -> str:
	q = query.lower()
	if any(word in q for word in DB_KEYWORDS):
		return "database"
	if any(word in q for word in KNOWLEDGE_KEYWORDS):
		return "knowledge"
	return "knowledge"  # default to knowledge


@app.post("/ask")
async def ask(body: QueryRequest):
    try:
        user_query = body.query
        mode = detect_mode(user_query)
        if mode == "database":
            response = await gemini_call(user_query, db_schema, mode="database")
            sql = response.get("explanation", "")
            # Log or return the generated SQL for debugging
            print(f"Generated SQL: {sql}")
            results = await run_sql(sql) if sql else []
            return {"results": results, "sql": sql}
        else:
            response = await gemini_call(user_query, startup_tn_knowledge_base, mode="knowledge")
            results = response.get("results", [])
            explanation = response.get("explanation", "")
            return {"results": results}
    except Exception as e:
        import logging
        logging.error(traceback.format_exc())
        return JSONResponse({"error": str(e)}, status_code=500)

