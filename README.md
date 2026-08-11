# Analytics SaaS Backend API

> A production ready FastAPI backend scaffold for an analytics SaaS application.

---

## Overview

This repository contains a modular backend service built with:

- **FastAPI** for HTTP APIs
- **SQLAlchemy** for ORM models and PostgreSQL integration
- **Alembic** for database migrations
- **Celery** + **RabbitMQ** for background task processing
- **Redis** for caching or Celery results
- **PyTest** for tests

The project is designed for a versioned API structure, clean separation between API, services, models, and worker logic, and Docker-based local development.

## Key features

- API versioning under `app/api/v1`
- Pydantic schemas for request/response validation
- SQLAlchemy relationships and join-ready models
- Postgres-backed persistence
- Background task queue support via Celery/RabbitMQ
- Alembic migrations for schema changes

## Repository structure

- `app/`
  - `main.py` - FastAPI application entrypoint
  - `api/v1/` - versioned REST routers
  - `core/` - configuration, security, and JWT helpers
  - `db/` - database session and initialization logic
  - `models/` - SQLAlchemy models with relationships
  - `schemas/` - request/response Pydantic models
  - `services/` - business logic layer
  - `worker/` - Celery worker configuration
- `migrations/` - Alembic migration environment and revision scripts
- `tests/` - integration and unit tests
- `Dockerfile` - image build instructions
- `docker-compose.yml` - full local stack with Postgres, RabbitMQ, Redis, web, and worker

## Prerequisites

- Python 3.11+ or 3.12
- Docker and Docker Compose

## Local development

1. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   .venv\Scripts\activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Copy, review, or update `.env` values if needed:

   ```env
   DATABASE_URL=postgresql+psycopg2://postgres:postgres@db:5432/saas
   SECRET_KEY=supersecret
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   CELERY_BROKER_URL=amqp://guest:guest@rabbitmq//
   REDIS_URL=redis://redis:6379/0
   ```

4. Start the application directly:

   ```bash
   uvicorn app.main:app --reload
   ```

5. Open the API docs:

   - `http://127.0.0.1:8000/docs`
   - `http://127.0.0.1:8000/redoc`

## Docker Compose

Launch the full stack:

```bash
docker compose up --build
```

Stop the stack:

```bash
docker compose down
```

If you need a shell in the web container:

```bash
docker compose exec web sh
```

## Database migrations

Initialize or apply migrations:

```bash
alembic upgrade head
```

Generate a new migration after model changes:

```bash
alembic revision --autogenerate -m "describe changes"
alembic upgrade head
```

## Testing

Run the test suite:

```bash
pytest
```

## Notes

- The current backend includes starter authentication, billing, health, and notification modules.
- Models are designed for relational joins, with `User`, `Billing`, and `Notification` relationships configured.
- Celery is configured for future background task processing via `app.worker.celery_app`.

## Contribution

Feel free to extend the API with:

- authentication flows and token handling
- billing subscription management
- notification queuing and delivery
- analytics event ingestion endpoints
