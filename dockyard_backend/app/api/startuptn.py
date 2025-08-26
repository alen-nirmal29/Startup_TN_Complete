from fastapi import APIRouter, Depends
from app.core.startup_tn_kb_utils import StartupTNKnowledgeBase

router = APIRouter()
kb = StartupTNKnowledgeBase()

@router.get("/startuptn/program/{program_name}/sections")
async def get_program_sections(program_name: str):
    sections_order, sections, urls_hint, submit = kb.get_program_sections(program_name)
    if not sections_order:
        return {"error": "I do not have that information in my knowledge base."}
    return {
        "sections_order": sections_order,
        "sections": sections,
        "urls_hint": urls_hint
    }

@router.get("/startuptn/program/{program_name}/section/{section_name}")
async def get_section_fields(program_name: str, section_name: str):
    required, repeaters, url = kb.get_section_fields(program_name, section_name)
    if required is None:
        return {"error": "I do not have that information in my knowledge base."}
    return {
        "required": required,
        "repeaters": repeaters,
        "url": url
    }

@router.get("/startuptn/program/{program_name}/submit")
async def get_submit_info(program_name: str):
    submit = kb.get_submit_info(program_name)
    if not submit:
        return {"error": "I do not have that information in my knowledge base."}
    return submit

@router.get("/startuptn/ecosystem/{entity_type}")
async def get_ecosystem(entity_type: str, filter_key: str = None, filter_value: str = None):
    entities = kb.get_ecosystem(entity_type, filter_key, filter_value)
    if not entities:
        return {"error": "I do not have that information in my knowledge base."}
    return entities
