from typing import List, Optional, Dict, Any
from pydantic import BaseModel, ConfigDict


class PromptInput(BaseModel):
    prompt: str


class StructuredQuery(BaseModel):
    query_type: str
    sector: Optional[str] = None
    stage: Optional[str] = None
    geography: Optional[str] = None
    keywords: List[str] = []


class SearchResult(BaseModel):
    model_config = ConfigDict(extra='allow')
    # Fields below can be made Optional if they are not always present, 
    # but extra='allow' helps with new fields.
    service_name: Optional[str] = None
    description: Optional[str] = None
    access_link: Optional[str] = None


class ActionPlanItem(BaseModel):
    entity_name: str
    entity_type: str
    reason_relevant: str
    next_steps: List[str]


class AIActionPlan(BaseModel):
    action_plan: List[ActionPlanItem]
    message: Optional[str] = None


class PromptOutput(BaseModel):
    query: str
    structured_query: StructuredQuery
    results: List[SearchResult]
    ai_action_plan: AIActionPlan

