from pydantic import BaseModel, ConfigDict

class Token(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class TokenRefresh(BaseModel):
    refresh_token: str

class TokenData(BaseModel):
    email: str | None = None