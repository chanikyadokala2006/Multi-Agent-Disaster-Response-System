import os

class Settings:
    PROJECT_NAME: str = "Multi-Agent Disaster Response System"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://disaster_admin:disaster_secure_pass_123@db:5432/disaster_response_db"
    )
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")

settings = Settings()
