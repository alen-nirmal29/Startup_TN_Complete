from typing import List, Dict, Any

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
                if "revenue >=" in keyword:
                    try:
                        min_revenue = float(keyword.split(">=")[1].strip().replace("L", "00000"))
                    except ValueError:
                        pass # Handle invalid revenue format if necessary
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

