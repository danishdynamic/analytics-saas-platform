from backend.app.db.database import get_db

# Expose the shared session provider for application modules

__all__ = ["get_db"]
