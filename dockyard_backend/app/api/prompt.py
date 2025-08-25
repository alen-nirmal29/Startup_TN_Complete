from fastapi import APIRouter, Depends

from app.models.prompt_models import PromptInput, PromptOutput, StructuredQuery, SearchResult, AIActionPlan
from app.services.gemini_service import GeminiService
from app.services.search_service import SearchService

router = APIRouter()

@router.post("/prompt", response_model=PromptOutput)
async def handle_prompt(
    prompt_input: PromptInput,
    gemini_service: GeminiService = Depends(),
    search_service: SearchService = Depends()
):
    # 1. AI Rewriting (Intent Extraction)
    structured_query_dict = gemini_service.extract_intent(prompt_input.prompt)
    structured_query = StructuredQuery(**structured_query_dict)

    # 2. Database Search (Supabase -> PostgreSQL)
    search_results = search_service.perform_search(structured_query)

    # 3. AI Post-Processing (User-Friendly Output)
    ai_action_plan_dict = gemini_service.generate_action_plan([result.model_dump() for result in search_results])
    ai_action_plan = AIActionPlan(**ai_action_plan_dict)

    # 4. Return Response to Frontend
    return PromptOutput(
        query=prompt_input.prompt,
        structured_query=structured_query,
        results=search_results,
        ai_action_plan=ai_action_plan
    )

