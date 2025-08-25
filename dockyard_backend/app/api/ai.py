from fastapi import APIRouter, Depends
from typing import List

from app.models.prompt_models import SearchResult, AIActionPlan
from app.services.gemini_service import GeminiService

router = APIRouter()

@router.post("/ai/action-plan", response_model=AIActionPlan)
async def generate_action_plan(search_results: List[SearchResult], gemini_service: GeminiService = Depends()):
    action_plan_dict = gemini_service.generate_action_plan([result.model_dump() for result in search_results])
    return AIActionPlan(**action_plan_dict)

