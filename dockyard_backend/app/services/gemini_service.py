import google.generativeai as genai
import json
import logging

from app.models.prompt_models import StructuredQuery

from app.core.config import settings

# Configure logging to a file
# logging.basicConfig(filename='gemini_response_debug.log', level=logging.DEBUG,
#                     format='%(asctime)s - %(levelname)s - %(message)s')

genai.configure(api_key=settings.GEMINI_API_KEY)

class GeminiService:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    def extract_intent(self, prompt: str) -> dict:
        system_prompt = """Extract the following from the user query: sector, stage, geography, query_type (funding, mentorship, compliance, corporate partnership, export, etc.). Rewrite the query in a structured JSON format for database search. If a field is not present, use null. Example Output:

{
  "query_type": "compliance",
  "sector": null,
  "stage": "growth",
  "geography": "Coimbatore",
  "keywords": ["compliance support", "legal", "GST filing"]
}
"""
        response = self.model.generate_content(f"{system_prompt}\nUser query: {prompt}")
        # logging.debug(f"Raw Gemini response (extract_intent): {response.text!r}") # Debug logging removed
        # Clean the response to remove markdown and extra newlines
        clean_response_text = response.text.replace('```json', '').replace('```', '').strip()
        return json.loads(clean_response_text)

    def generate_action_plan(self, search_results: list[dict], original_query: str, structured_query: StructuredQuery) -> dict:
        system_prompt = f"""You are an AI that generates structured JSON action plans.

### Rules:
- Respond ONLY with valid JSON.
- Do not include explanations, Markdown, or text outside the JSON.
- If no relevant results are found, return:
  {{
    "action_plan": [],
    "message": "No relevant results found for your query."
  }}

### Input:
- User Query: {original_query}
- Structured Query:
```json
{json.dumps(structured_query.model_dump(), indent=2)}
```
- Search Results:
```json
{json.dumps(search_results, indent=2)}
```

### Output JSON Format:
{{
  "action_plan": [
    {{
      "entity_name": "string",
      "entity_type": "string",
      "reason_relevant": "string",
      "next_steps": [ "string", "string", "..." ]
    }}
  ],
  "message": "string"  # Optional message, if needed
}}
"""
        response = self.model.generate_content(system_prompt)
        # logging.debug(f"Raw Gemini response (generate_action_plan): {response.text!r}") # Debug logging removed
        # Clean the response to remove markdown and extra newlines
        clean_response_text = response.text.replace('```json', '').replace('```', '').strip()
        if not clean_response_text:
            logging.warning("Gemini generate_action_plan returned empty response after cleaning. Returning empty action plan.")
            return {"action_plan": [], "message": "Gemini returned an empty action plan."} # Updated message to reflect empty action plan
        try:
            return json.loads(clean_response_text)
        except json.JSONDecodeError:
            logging.error(f"AI returned invalid JSON: {clean_response_text!r}")
            return {"action_plan": [], "message": "AI response was not valid JSON"}

