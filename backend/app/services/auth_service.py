from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserLogin
from app.schemas.token import Token
from app.core.security import get_password_hash, verify_password, create_access_token, create_refresh_token
from app.models.user import User

class AuthService:
    def signup(self, db: Session, user: UserCreate) -> Token:
        # Check if user exists
        existing = db.query(User).filter(User.email == user.email).first()
        if existing:
            raise ValueError("User already exists")

        # Truncate password to 72 bytes (bcrypt limit)
        password = user.password[:72]
        
        hashed_password = get_password_hash(password)
        db_user = User(email=user.email, hashed_password=hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        access_token = create_access_token({"sub": db_user.email, "user_id": db_user.id})
        refresh_token = create_refresh_token({"sub": db_user.email, "user_id": db_user.id})
        return Token(access_token=access_token, refresh_token=refresh_token)
    
    def login(self, db, user):
        db_user = db.query(User).filter(User.email == user.email).first()
        if not db_user:
            raise ValueError("Invalid credentials")
        
        # Truncate password to 72 bytes
        password = user.password[:72]
        
        if not verify_password(password, db_user.hashed_password):
            raise ValueError("Invalid credentials")
        
        access_token = create_access_token({"sub": db_user.email, "user_id": db_user.id})
        refresh_token = create_refresh_token({"sub": db_user.email, "user_id": db_user.id})
        return {"access_token": access_token, "refresh_token": refresh_token}