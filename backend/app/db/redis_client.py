import redis
from app.core.config import settings

redis_client = redis.from_url(settings.redis_url, decode_responses=True)

def blacklist_token(token_jti: str, expire_seconds: int) -> None:
    redis_client.setex(f"blacklist:{token_jti}", expire_seconds, "1")

def is_token_blacklisted(token_jti: str) -> bool:
    return redis_client.exists(f"blacklist:{token_jti}") == 1