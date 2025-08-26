# Unified JSON schema for StartupTN / OneTN AI Assistant
# This file contains the knowledge base for programs, ecosystem, and rules.

startup_tn_knowledge_base = {
    "programs": {
        "TANFUND": {
            "namespace": "startuptn",
            "wizard": {
                "sections_order": [
                    "startup_details",
                    "funding_financials",
                    "team_info",
                    "incubation_acceleration",
                    "product_market_fit",
                    "business_strategy",
                    "traction_achievements",
                    "funding_utilisation",
                    "documents_upload"
                ],
                "sections": {
                    "startup_details": {
                        "required": [
                            "startup_name",
                            "incorporation_date",
                            "logo",
                            "legal_entity",
                            "sector",
                            "growth_stage",
                            "brief_startup_desc",
                            "problem_statement",
                            "proposed_solution",
                            "category_relevance",
                            "dpiit_registered",
                            "incorporation_certificate",
                            "email",
                            "phone",
                            "city",
                            "state",
                            "country"
                        ]
                    },
                    "funding_financials": {
                        "required": [
                            "desired_funding_amount",
                            "preferred_instrument",
                            "revenue_stage",
                            "annual_revenue",
                            "monthly_burn_rate",
                            "total_funds_raised_till_date"
                        ],
                        "repeaters": ["fundraising_history", "funding_programs"]
                    },
                    "team_info": {
                        "required": ["founders"],
                        "repeaters": ["founders", "advisors"]
                    },
                    "incubation_acceleration": {
                        "required": ["incubated_now_or_past", "receiving_other_support"]
                    },
                    "product_market_fit": {
                        "required": [
                            "about_startup",
                            "owns_patents",
                            "technology_stack",
                            "market_analysis",
                            "products"
                        ],
                        "repeaters": ["products"]
                    },
                    "business_strategy": {
                        "required": [
                            "business_model",
                            "revenue_generation_model",
                            "gtm_strategy"
                        ]
                    },
                    "traction_achievements": {
                        "required": [
                            "num_customers",
                            "growth_rate",
                            "major_achievements"
                        ],
                        "repeaters": ["tractions_details"]
                    },
                    "funding_utilisation": {
                        "required": [
                            "previous_funding_rounds",
                            "utilisation_details"
                        ],
                        "repeaters": ["utilisation_details"]
                    },
                    "documents_upload": {
                        "required": ["startup_presentation"]
                    }
                },
                "urls_hint": {
                    "product_market_fit": "/startup/product-market",
                    "business_strategy": "/startup/business-strategy",
                    "funding_utilisation": "/startup/funding-utilisation",
                    "documents_upload": "/startup/documents-upload"
                },
                "submit": {
                    "action": "Submit for validation",
                    "prechecks": [
                        "all_required_fields_completed",
                        "files_within_limits",
                        "contact_verified_format"
                    ]
                }
            }
        }
    },
    "ecosystem": {
        "incubators": [
            {
                "name": "AI Venture Factory",
                "focus_sector": ["Artificial Intelligence"],
                "facilities": ["Co-working", "Seminar Hall", "MakerSpace"],
                "recognitions": ["India’s first AI Incubator"],
                "contact": {
                    "phone": "9597357386",
                    "email": "nethyasri@aivf.io"
                }
            },
            {
                "name": "Forge Innovation Accelerator",
                "focus_sector": ["DeepTech", "MedTech", "Industry 4.0"],
                "facilities": ["Prototyping Lab", "Co-working"],
                "schemes_supported": ["AIM", "SISFS"],
                "contact": {
                    "phone": "9898989898",
                    "email": "contact@forge.in"
                }
            }
        ],
        "resources": [
            {
                "scheme": "AIM",
                "description": "Atal Innovation Mission scheme for incubators."
            },
            {
                "scheme": "SISFS",
                "description": "Startup India Seed Fund Scheme for early-stage startups."
            }
        ],
        "events": [
            {
                "name": "Innovation Conclave 2024",
                "venue": "Coimbatore",
                "date": "2024-11-15",
                "organizer": "StartupTN"
            },
            {
                "name": "DeepTech Hackathon",
                "venue": "Chennai",
                "date": "2025-01-20",
                "organizer": "Forge"
            }
        ]
    }
}
