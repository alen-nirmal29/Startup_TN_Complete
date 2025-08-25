import google.generativeai as genai
import json
import logging

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

    def generate_action_plan(self, search_results: list[dict]) -> dict:
        system_prompt = """Convert the provided search results into an action plan with step-by-step guidance and clickable URLs. Ensure the output is a JSON object with a single key 'action_plan' which is a list of strings. Example AI Output:

{
  "action_plan": [
    "Connect with StartupTN-approved compliance partners.",
    "Access [VakilSearch Toolkit](https://vakilsearch.com/compliance).",
    "Book a free legal consultation.",
    "Next steps: File GST → Complete ROC compliances → Apply for Startup India Benefits."
  ]
}

Search Results: """
        response = self.model.generate_content(f"{system_prompt}{{json.dumps(search_results)}}")
        # logging.debug(f"Raw Gemini response (generate_action_plan): {response.text!r}") # Debug logging removed
        # Clean the response to remove markdown and extra newlines
        clean_response_text = response.text.replace('```json', '').replace('```', '').strip()
        return json.loads(clean_response_text)

