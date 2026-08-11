from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserLogin
from app.schemas.token import Token, TokenRefresh
from app.services.auth_service import AuthService
from app.db.database import get_db
from app.core.security import decode_token, create_access_token
from app.db.redis_client import blacklist_token, is_token_blacklisted
from jose import JWTError

router = APIRouter()
auth_service = AuthService()

@router.post("/signup", response_model=Token)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    try:
        return auth_service.signup(db, user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    try:
        return auth_service.login(db, user)
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))

@router.post("/refresh", response_model=Token)
def refresh(token_data: TokenRefresh):
    try:
        payload = decode_token(token_data.refresh_token)
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        
        email = payload.get("sub")
        user_id = payload.get("user_id")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        access_token = create_access_token({"sub": email, "user_id": user_id})
        refresh_token = create_refresh_token({"sub": email, "user_id": user_id})
        return Token(access_token=access_token, refresh_token=refresh_token)
    except (JWTError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid refresh token")

@router.post("/logout")
def logout(token_data: TokenRefresh):
    try:
        payload = decode_token(token_data.refresh_token)
        jti = payload.get("jti") or token_data.refresh_token[:20]
        exp = payload.get("exp")
        if exp:
            ttl = int(exp - __import__('time').time())
            if ttl > 0:
                blacklist_token(jti, ttl)
        return {"message": "Logged out successfully"}
    except (JWTError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid token")