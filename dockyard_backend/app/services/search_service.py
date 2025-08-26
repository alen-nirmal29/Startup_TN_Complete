from typing import List, Dict, Any
import re

from app.db.queries import search_services, search_funding_entities
from app.db.supabase_client import get_supabase_client
from app.models.prompt_models import StructuredQuery, SearchResult


class SearchService:
    def __init__(self):
        self.supabase = get_supabase_client()

    def perform_search(self, structured_query: StructuredQuery) -> List[SearchResult]:
        query_type = structured_query.query_type
        results_data: List[Dict[str, Any]] = []

        if query_type == "funding":
            # Extract min_revenue from keywords if present
            min_revenue = None
            for keyword in structured_query.keywords:
                if "revenue" in keyword:
                    # Using regex to extract numerical value and unit (Crore, Lakh)
                    match = re.search(r"revenue.*?(\d+\.?\d*)\s*(Crore|Lakh)?", keyword, re.IGNORECASE)
                    if match:
                        value = float(match.group(1))
                        unit = match.group(2)
                        if unit and unit.lower() == "crore":
                            min_revenue = value * 10000000  # 1 Crore = 10,000,000
                        elif unit and unit.lower() == "lakh":
                            min_revenue = value * 100000    # 1 Lakh = 100,000
                        else:
                            min_revenue = value # Assume it's already in the correct unit if no unit specified
            results_data = search_funding_entities(
                self.supabase,
                structured_query.sector,
                structured_query.geography,
                min_revenue
            )
        elif query_type == "compliance": # Default to services_marketplace for compliance and others
            keywords = structured_query.keywords
            if structured_query.query_type:
                keywords.append(structured_query.query_type)
            if structured_query.geography:
                keywords.append(structured_query.geography)
            results_data = search_services(self.supabase, keywords)
        else:
            # Handle other query types or default search
            keywords = structured_query.keywords
            if structured_query.query_type:
                keywords.append(structured_query.query_type)
            if structured_query.geography:
                keywords.append(structured_query.geography)
            results_data = search_services(self.supabase, keywords)

        return [SearchResult(**data) for data in results_data]

