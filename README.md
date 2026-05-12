# Analytics SaaS Backend API

A FastAPI backend scaffold for an analytics SaaS product.

## Project structure

- `app/` - application modules and routers
- `app/api/v1/` - versioned REST API routes
- `app/core/` - configuration and security logic
- `app/db/` - database session and model imports
- `app/models/` - SQLAlchemy models
- `app/schemas/` - Pydantic request/response schemas
- `app/services/` - business logic services
- `app/worker/` - Celery worker configuration
- `tests/` - integration and unit tests
- `migrations/` - Alembic migration scripts

## Getting started

1. Create a virtual environment:
   ```bash
   python -m venv venv
   .\\venv\\Scripts\\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the application:
   ```bash
   uvicorn app.main:app --reload
   ```

## Docker / Compose

Use `docker-compose up --build` to launch Postgres, RabbitMQ, and the FastAPI app.
