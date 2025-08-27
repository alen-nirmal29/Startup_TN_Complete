# Database schema for Gemini SQL generation

db_schema = {
  "tables": {
    "schemes": {
      "columns": ["scheme_id", "scheme_name", "offering_department", "eligibility_criteria", "application_link", "tags"],
      "usage": "Search schemes using eligibility_criteria or tags. Return scheme_name, eligibility_criteria, application_link.",
      "example_query": "SELECT scheme_name, eligibility_criteria, application_link FROM schemes WHERE eligibility_criteria ILIKE '%Seed Fund%' OR tags::text ILIKE '%Seed Fund%';"
    },
    "investors": {
      "columns": ["investor_id", "investor_name", "investor_type", "email", "linkedin_profile_url", "website_url", "bio", "investment_focus_sectors", "investment_focus_stages", "geographical_focus", "average_ticket_size", "portfolio_highlights", "is_actively_investing"],
      "usage": "Search investors using investor_name, bio, or JSONB fields like investment_focus_sectors and investment_focus_stages. Return investor_name, investor_type, email, website_url.",
      "example_query": "SELECT investor_name, investor_type, email, website_url FROM investors WHERE investment_focus_sectors::text ILIKE '%AI%' OR bio ILIKE '%AI%';"
    },
    "startups": {
      "columns": ["startup_id", "startup_name", "legal_name", "website_url", "date_of_incorporation", "address", "district", "short_description", "sector", "stage", "dpiit_recognition_no", "has_startuptn_certification"],
      "usage": "Search startups by startup_name, sector, stage, or short_description. Return startup_name, sector, stage.",
      "example_query": "SELECT startup_name, sector, stage FROM startups WHERE sector ILIKE '%Healthcare%' OR short_description ILIKE '%Healthcare%';"
    },
    "profiles": {
      "columns": ["user_id", "full_name", "email", "phone", "startup_id", "mentor_id", "investor_id", "partner_id", "role", "created_at", "updated_at", "deleted_at"],
      "usage": "Search profiles by full_name or email. Return full_name, email, role, and associated startup/mentor/investor/partner if exists.",
      "example_query": "SELECT full_name, email, role FROM profiles WHERE full_name ILIKE '%Barath%' OR email ILIKE '%example.com%';"
    },
    "founders": {
      "columns": ["founder_id", "startup_id", "founder_name", "email", "phone_number", "linkedin_profile_url", "created_at", "updated_at", "deleted_at"],
      "usage": "Search founders by founder_name or email. Return founder_name, email, linkedin_profile_url.",
      "example_query": "SELECT founder_name, email, linkedin_profile_url FROM founders WHERE founder_name ILIKE '%John Doe%';"
    },
    "mentors": {
      "columns": ["mentor_id", "mentor_name", "email", "linkedin_profile_url", "profile_picture_url", "bio", "current_position", "years_of_experience", "areas_of_expertise", "industry_specialization", "availability", "created_at", "updated_at", "deleted_at"],
      "usage": "Search mentors by mentor_name, areas_of_expertise, or industry_specialization. Return mentor_name, areas_of_expertise, email, linkedin_profile_url.",
      "example_query": "SELECT mentor_name, areas_of_expertise, email, linkedin_profile_url FROM mentors WHERE areas_of_expertise::text ILIKE '%Blockchain%';"
    },
    "ecosystem_partners": {
      "columns": ["partner_id", "partner_name", "partner_type", "website_url", "about", "primary_contact_name", "primary_contact_email", "created_at", "updated_at", "deleted_at"],
      "usage": "Search partners by partner_name or about. Return partner_name, partner_type, website_url.",
      "example_query": "SELECT partner_name, partner_type, website_url FROM ecosystem_partners WHERE about ILIKE '%Innovation%';"
    },
    "corporates": {
      "columns": ["corporate_id", "industry", "engagement_interests", "focus_sectors"],
      "usage": "Search corporates by industry or JSONB fields. Return corporate_id, industry.",
      "example_query": "SELECT corporate_id, industry FROM corporates WHERE industry ILIKE '%Energy%' OR engagement_interests::text ILIKE '%Energy%';"
    },
    "incubators": {
      "columns": ["incubator_id", "program_type", "sector_specialization"],
      "usage": "Search incubators by program_type or sector_specialization. Return incubator_id, program_type.",
      "example_query": "SELECT incubator_id, program_type FROM incubators WHERE program_type ILIKE '%Acceleration%';"
    },
    "service_providers": {
      "columns": ["provider_id", "service_category", "services_offered"],
      "usage": "Search by service_category or services_offered. Return service_category, services_offered.",
      "example_query": "SELECT service_category, services_offered FROM service_providers WHERE services_offered::text ILIKE '%Cloud Computing%';"
    },
    "infrastructure_partners": {
      "columns": ["infra_id", "facility_type", "location"],
      "usage": "Search by facility_type or location. Return facility_type, location.",
      "example_query": "SELECT facility_type, location FROM infrastructure_partners WHERE location ILIKE '%Bangalore%';"
    },
    "financials": {
      "columns": ["financial_id", "startup_id", "total_funding_raised", "revenue_last_fy", "profitability", "runway_months", "created_at", "updated_at", "deleted_at"],
      "usage": "Search by startup_id or funding metrics. Return total_funding_raised, revenue_last_fy, profitability.",
      "example_query": "SELECT total_funding_raised, revenue_last_fy, profitability FROM financials WHERE total_funding_raised > 1000000;"
    },
    "team_info": {
      "columns": ["team_id", "startup_id", "team_size", "tech_team_size", "leadership_bios", "created_at", "updated_at", "deleted_at"],
      "usage": "Search by startup_id. Return team_size, tech_team_size, leadership_bios.",
      "example_query": "SELECT team_size, tech_team_size, leadership_bios FROM team_info WHERE startup_id = 10;"
    },
    "incubation_details": {
      "columns": ["incubation_id", "startup_id", "incubator_name", "program_name", "start_date", "end_date", "created_at", "updated_at", "deleted_at"],
      "usage": "Search by startup_id or incubator_name. Return incubator_name, program_name, start_date, end_date.",
      "example_query": "SELECT incubator_name, program_name, start_date, end_date FROM incubation_details WHERE incubator_name ILIKE '%Tech%';"
    },
    "product_market_fit": {
      "columns": ["pmf_id", "startup_id", "problem_solved", "target_customer", "evidence_of_pmf", "created_at", "updated_at", "deleted_at"],
      "usage": "Search by startup_id or problem_solved. Return problem_solved, target_customer.",
      "example_query": "SELECT problem_solved, target_customer FROM product_market_fit WHERE problem_solved ILIKE '%Healthcare%';"
    },
    "business_strategy": {
      "columns": ["strategy_id", "startup_id", "business_model", "gtm_strategy", "pricing_model", "created_at", "updated_at", "deleted_at"],
      "usage": "Search by startup_id. Return business_model, gtm_strategy, pricing_model.",
      "example_query": "SELECT business_model, gtm_strategy, pricing_model FROM business_strategy WHERE startup_id = 5;"
    },
    "traction": {
      "columns": ["traction_id", "startup_id", "key_metrics", "notes", "created_at", "updated_at", "deleted_at"],
      "usage": "Search by startup_id. Return key_metrics, notes.",
      "example_query": "SELECT key_metrics, notes FROM traction WHERE startup_id = 5;"
    },
    "funding_utilization": {
      "columns": ["utilization_id", "startup_id", "funding_utilization_plan", "created_at", "updated_at", "deleted_at"],
      "usage": "Search by startup_id. Return funding_utilization_plan.",
      "example_query": "SELECT funding_utilization_plan FROM funding_utilization WHERE startup_id = 5;"
    },
    "growth_card": {
      "columns": ["growth_card_id", "startup_id", "growth_score", "ecosystem_utilization_percent", "created_at", "updated_at", "deleted_at"],
      "usage": "Search by startup_id. Return growth_score, ecosystem_utilization_percent.",
      "example_query": "SELECT growth_score, ecosystem_utilization_percent FROM growth_card WHERE startup_id = 5;"
    },
    "growth_card_milestones": {
      "columns": ["milestone_id", "growth_card_id", "milestone_description", "status", "completion_date", "created_at", "updated_at"],
      "usage": "Search by growth_card_id. Return milestone_description, status, completion_date.",
      "example_query": "SELECT milestone_description, status, completion_date FROM growth_card_milestones WHERE growth_card_id = 5;"
    },
    "startup_mentor_matchmaking": {
      "columns": ["match_id", "startup_id", "mentor_id", "status", "sessions_completed", "created_at", "updated_at"],
      "usage": "Search by startup_id or mentor_id. Return status, sessions_completed.",
      "example_query": "SELECT status, sessions_completed FROM startup_mentor_matchmaking WHERE startup_id = 5;"
    },
    "services_marketplace": {
      "columns": ["service_id", "service_name", "service_provider", "category", "description", "access_link", "created_at", "updated_at"],
      "usage": "Search by service_name, category, or description. Return service_name, category, access_link.",
      "example_query": "SELECT service_name, category, access_link FROM services_marketplace WHERE category ILIKE '%Marketing%';"
    },
    "innovation_challenges": {
      "columns": ["challenge_id", "title", "description", "owner_partner_id", "sector", "status", "apply_link", "start_date", "end_date", "created_at", "updated_at"],
      "usage": "Search by title, description, or sector. Return title, description, apply_link.",
      "example_query": "SELECT title, description, apply_link FROM innovation_challenges WHERE sector ILIKE '%AI%';"
    },
    "challenge_submissions": {
      "columns": ["submission_id", "challenge_id", "startup_id", "pitch_summary", "attachments", "status", "created_at", "updated_at", "deleted_at"],
      "usage": "Search by challenge_id or startup_id. Return pitch_summary, status.",
      "example_query": "SELECT pitch_summary, status FROM challenge_submissions WHERE startup_id = 5;"
    },
    "tanfund_deals": {
      "columns": ["deal_id", "startup_id", "investor_id", "stage", "amount_expected", "amount_committed", "status", "created_at", "updated_at"],
      "usage": "Search by startup_id or investor_id. Return stage, amount_expected, amount_committed, status.",
      "example_query": "SELECT stage, amount_expected, amount_committed, status FROM tanfund_deals WHERE startup_id = 5;"
    },
    "catalyst_linkages": {
      "columns": ["linkage_id", "startup_id", "incubator_id", "status", "start_date", "end_date", "created_at", "updated_at"],
      "usage": "Search by startup_id or incubator_id. Return status, start_date, end_date.",
      "example_query": "SELECT status, start_date, end_date FROM catalyst_linkages WHERE startup_id = 5;"
    },
    "mentor_sessions": {
      "columns": ["session_id", "match_id", "session_date", "duration_minutes", "notes", "outcome", "created_at", "updated_at"],
      "usage": "Search by match_id. Return session_date, duration_minutes, notes, outcome.",
      "example_query": "SELECT session_date, duration_minutes, notes, outcome FROM mentor_sessions WHERE match_id = 5;"
    },
    "partnership_requests": {
      "columns": ["request_id", "corporate_id", "startup_id", "request_type", "description", "status", "created_at", "updated_at"],
      "usage": "Search by corporate_id or startup_id. Return request_type, description, status.",
      "example_query": "SELECT request_type, description, status FROM partnership_requests WHERE startup_id = 5;"
    },
    "global_market_connects": {
      "columns": ["connect_id", "startup_id", "program_name", "partner_org", "status", "support_details", "created_at", "updated_at"],
      "usage": "Search by startup_id or program_name. Return program_name, partner_org, status, support_details.",
      "example_query": "SELECT program_name, partner_org, status, support_details FROM global_market_connects WHERE startup_id = 5;"
    },
    "search_logs": {
      "columns": ["log_id", "user_id", "query", "intent", "parsed_filters", "results_count", "created_at"],
      "usage": "Search by user_id or keywords in query. Return query, results_count.",
      "example_query": "SELECT query, results_count FROM search_logs WHERE query ILIKE '%Seed Fund%';"
    },
    "action_logs": {
      "columns": ["action_id", "user_id", "action_type", "entity_table", "entity_id", "metadata", "created_at"],
      "usage": "Search by user_id or action_type. Return action_type, entity_table, entity_id.",
      "example_query": "SELECT action_type, entity_table, entity_id FROM action_logs WHERE action_type ILIKE '%UPDATE%';"
    },
    "observation_snapshots": {
      "columns": ["snapshot_id", "as_of_date", "metrics"],
      "usage": "Search snapshots by as_of_date. Return metrics.",
      "example_query": "SELECT metrics FROM observation_snapshots WHERE as_of_date = '2025-08-01';"
    }
  }
}
