from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )

    database_url: str = "postgresql+psycopg2://postgres:postgres@db:5432/saas"
    secret_key: str = "supersecret"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7
    celery_broker_url: str = "amqp://guest:guest@rabbitmq//"
    redis_url: str = "redis://redis:6379/0"


settings = Settings()
