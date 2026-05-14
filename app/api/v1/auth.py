from fastapi import APIRouter, Depends, HTTPException
from app.schemas.user import UserCreate
from app.schemas.token import Token
from app.services.auth_service import AuthService

router = APIRouter()

auth_service = AuthService()

@router.post("/signup", response_model=Token)
def signup(user: UserCreate):
    return auth_service.signup(user)

@router.post("/login", response_model=Token)
def login(user: UserCreate):
    return auth_service.login(user)
