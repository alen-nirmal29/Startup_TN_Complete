
import json
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.api import prompt
from app.utils.ai_db_utils import gemini_call, run_sql
import traceback
from app.core.startup_tn_knowledge_base import startup_tn_knowledge_base
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
        import re

        # Call gemini_call with query and knowledge base
        if mode == "database":
            response = await gemini_call(user_query, startup_tn_knowledge_base, mode="database")
            # Extract SQL from response (strip code blocks, etc.)
            sql_clean = re.sub(r"^```sql|```$", "", response.strip(), flags=re.IGNORECASE).strip()
            results = await run_sql(sql_clean)
            return {"mode": "database", "sql": sql_clean, "results": results}
        else:
            response = await gemini_call(user_query, startup_tn_knowledge_base, mode="knowledge")
            return {"mode": "knowledge", "answer": response}
    except Exception as e:
        import logging
        logging.error(traceback.format_exc())
        return JSONResponse({"error": str(e)}, status_code=500)

