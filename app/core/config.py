from pydantic import BaseSettings

class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg2://postgres:postgres@db:5432/saas"
    secret_key: str = "supersecret"
    access_token_expire_minutes: int = 30
    celery_broker_url: str = "amqp://guest:guest@rabbitmq//"
    redis_url: str = "redis://redis:6379/0"

    class Config:
        env_file = ".env"

settings = Settings()
