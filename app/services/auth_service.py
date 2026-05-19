from app.schemas.user import UserCreate
from app.schemas.token import Token
from app.core.security import get_password_hash, verify_password, create_access_token

class AuthService:
    def signup(self, user: UserCreate) -> Token:
        hashed_password = get_password_hash(user.password)
        # TODO: persist user in database
        return Token(access_token=create_access_token({"sub": user.email}), token_type="bearer")

    def login(self, user: UserCreate) -> Token:
        # TODO: validate user credentials against database
        if not verify_password(user.password, get_password_hash(user.password)):
            raise ValueError("Invalid credentials")
        return Token(access_token=create_access_token({"sub": user.email}), token_type="bearer")
