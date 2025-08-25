from fastapi import APIRouter, Depends
from app.models.prompt_models import PromptInput, StructuredQuery
from app.services.gemini_service import GeminiService

router = APIRouter()

@router.post("/nlp/classify", response_model=StructuredQuery)
async def classify_prompt(prompt_input: PromptInput, gemini_service: GeminiService = Depends()):
    structured_query_dict = gemini_service.extract_intent(prompt_input.prompt)
    return StructuredQuery(**structured_query_dict)

