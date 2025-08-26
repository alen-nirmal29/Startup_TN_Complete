from supabase import Client
from typing import List, Dict, Any
import json

def search_services(supabase: Client, keywords: list[str]) -> list[dict]:
    query = supabase.table("services_marketplace").select("service_name, description, access_link")
    for kw in keywords:
        query = query.or_(f"category.ilike.%{{kw}}%,description.ilike.%{{kw}}%,service_name.ilike.%{{kw}}%")
    return query.execute().data

def search_funding_entities(supabase: Client, sector: str | None, geography: str | None, min_revenue: float | None) -> List[Dict[str, Any]]:
    query_investors = supabase.table("investors").select("investor_name, email, linkedin_profile_url, investment_focus_sectors, investment_focus_stages, geographical_focus, average_ticket_size")
    query_startups = supabase.table("startups").select("startup_name, website_url, short_description, sector, stage")

    if sector:
        # Ensure the JSON array for containment is passed as a quoted JSON string literal
        sector_json_array_string = json.dumps([sector])
        # query_investors = query_investors.filter("investment_focus_sectors", "@>", f'"{sector_json_array_string}"') # Temporarily commented out due to persistent APIError
        query_startups = query_startups.ilike("sector", f"%{sector}%")
    if geography:
        query_investors = query_investors.ilike("geographical_focus", f"%{geography}%")
        query_startups = query_startups.ilike("district", f"%{geography}%")
    
    if min_revenue is not None:
        # Correct usage of gte and in_ for subquery
        revenue_filtered_startup_ids = supabase.table("financials").select("startup_id").gte("revenue_last_fy", min_revenue).execute().data
        startup_ids_list = [item["startup_id"] for item in revenue_filtered_startup_ids]
        if startup_ids_list:
            query_startups = query_startups.in_("startup_id", startup_ids_list)
        else:
            # If no startups match the revenue criteria, ensure no startups are returned
            query_startups = query_startups.in_("startup_id", [-1]) # Use a non-existent ID to return empty

    investors_data = query_investors.limit(5).execute().data
    startups_data = query_startups.limit(5).execute().data

    results = []
    for item in investors_data:
        item["type"] = "investor"
        results.append(item)
    for item in startups_data:
        item["type"] = "startup"
        results.append(item)
        
    return results

