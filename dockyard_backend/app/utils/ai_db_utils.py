

import google.generativeai as genai
import json
import traceback
import logging

model = genai.GenerativeModel("gemini-2.0-flash")

async def gemini_call(query: str, unified_json: dict, mode: str = "knowledge") -> str:
    """
    Calls Gemini 2.0 Flash with a single user message containing multiple parts.
    
    Args:
        query: The user's question
        unified_json: The knowledge base dictionary
        mode: Either "knowledge" or "database" to determine instruction style
    """
    try:
        # Determine instructions based on mode
        if mode == "database":
            instructions = (
                "You are StartupTN Assistant. Generate SQL queries using snake_case field names only. "
                "Return ONLY the SQL query, no explanations. Always refer to the knowledge base schema."
            )
        else:
            instructions = (
                "You are StartupTN Assistant. Follow these rules strictly:\n"
                "1. Always answer user queries using the provided KNOWLEDGE_BASE JSON.\n"
                "2. For registration or application queries:\n"
                "   - Check KNOWLEDGE_BASE['programs']['TANFUND']['wizard']['sections_order']\n"
                "   - List required fields from KNOWLEDGE_BASE['programs']['TANFUND']['wizard']['sections']\n"
                "   - Include relevant URLs from KNOWLEDGE_BASE['programs']['TANFUND']['wizard']['urls_hint']\n"
                "3. For ecosystem queries, check KNOWLEDGE_BASE['ecosystem'] section.\n"
                "4. Use snake_case for all field names (e.g., startup_name, incorporation_date).\n"
                "5. Never say 'outside my scope' - always find relevant information in the JSON.\n"
                "6. Give step-by-step answers with clear instructions and required fields.\n"
                "7. If URLs are available in urls_hint for the topic, include them."
            )

        # Construct single user message with multiple parts
        message = {
            "role": "user",
            "parts": [
                {"text": instructions},
                {"text": f"KNOWLEDGE_BASE:\n{json.dumps(unified_json)}"},
                {"text": f"USER_QUERY:\n{query}"}
            ]
        }

        response = model.generate_content([message])
        return response.text.strip()
    except Exception as e:
        logging.error(traceback.format_exc())
        return f"Error: {str(e)}"

async def run_sql(query: str) -> list[dict]:
    # Placeholder: Replace with actual DB execution
    return [{"mock_result": True, "query": query}]
