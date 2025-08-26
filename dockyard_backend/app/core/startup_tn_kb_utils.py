# This module provides functions to answer queries using the StartupTN unified JSON knowledge base.
from .startup_tn_knowledge_base import startup_tn_knowledge_base

class StartupTNKnowledgeBase:
    def __init__(self):
        self.kb = startup_tn_knowledge_base

    def get_program_sections(self, program_name):
        program = self.kb["programs"].get(program_name)
        if not program:
            return None
        wizard = program.get("wizard", {})
        return wizard.get("sections_order", []), wizard.get("sections", {}), wizard.get("urls_hint", {}), wizard.get("submit", {})

    def get_section_fields(self, program_name, section_name):
        _, sections, urls_hint, _ = self.get_program_sections(program_name)
        section = sections.get(section_name)
        if not section:
            return None
        required = section.get("required", [])
        repeaters = section.get("repeaters", [])
        url = urls_hint.get(section_name)
        return required, repeaters, url

    def get_submit_info(self, program_name):
        _, _, _, submit = self.get_program_sections(program_name)
        return submit

    def get_ecosystem(self, entity_type=None, filter_key=None, filter_value=None):
        eco = self.kb["ecosystem"]
        if entity_type:
            entities = eco.get(entity_type, [])
            if filter_key and filter_value:
                return [e for e in entities if filter_value in e.get(filter_key, []) or filter_value == e.get(filter_key)]
            return entities
        return eco
