# Backend API

FastAPI backend for the Analytics SaaS Platform.

## Tech Stack
- FastAPI
- SQLAlchemy + PostgreSQL
- Alembic (migrations)
- Celery + RabbitMQ (background tasks)
- Redis (caching, token blacklist)
- Pytest (testing)

## Setup

### Local Development
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

## Docker Compose 

docker compose up --build

## Database Migrations

```bash
alembic init migrations
alembic revision --autogenerate -m "init"
alembic upgrade head
```

Run Tests

```bash
pytest
```

API Docs

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Architecture

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   FastAPI   │────▶│  PostgreSQL │     │    Redis    │
│   (Web)     │     │   (Data)    │◀────│ (Blacklist) │
└─────────────┘     └─────────────┘     └─────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│   Celery    │────▶│   RabbitMQ  │
│  (Worker)   │     │   (Broker)  │
└─────────────┘     └─────────────┘

## Environment Variables


| Variable                       | Description                  | Default                                               |
| ------------------------------ | ---------------------------- | ----------------------------------------------------- |
| DATABASE\_URL                  | PostgreSQL connection string | postgresql+psycopg2://postgres:postgres\@db:5432/saas |
| SECRET\_KEY                    | JWT signing key              | supersecret                                           |
| ACCESS\_TOKEN\_EXPIRE\_MINUTES | Access token TTL             | 15                                                    |
| REFRESH\_TOKEN\_EXPIRE\_DAYS   | Refresh token TTL            | 7                                                     |
| CELERY\_BROKER\_URL            | RabbitMQ URL                 | amqp\://guest:guest\@rabbitmq//                       |
| REDIS\_URL                     | Redis URL                    | redis\://redis:6379/0                                 |


---

## File Tree

backend/
├── app/
│   ├── init.py
│   ├── main.py
│   ├── core/
│   │   ├── init.py
│   │   ├── config.py
│   │   ├── security.py
│   │   └── dependencies.py
│   ├── db/
│   │   ├── init.py
│   │   ├── base.py
│   │   ├── database.py
│   │   └── redis_client.py
│   ├── models/
│   │   ├── init.py
│   │   ├── base.py
│   │   ├── user.py
│   │   ├── notification.py
│   │   ├── event.py
│   │   ├── order.py
│   │   └── billing.py
│   ├── schemas/
│   │   ├── init.py
│   │   ├── user.py
│   │   ├── token.py
│   │   ├── notification.py
│   │   ├── event.py
│   │   └── order.py
│   ├── services/
│   │   ├── init.py
│   │   ├── auth_service.py
│   │   ├── notification_service.py
│   │   ├── event_service.py
│   │   └── order_service.py
│   ├── api/
│   │   └── v1/
│   │       ├── init.py
│   │       ├── auth.py
│   │       ├── billing.py
│   │       ├── health.py
│   │       ├── notifications.py
│   │       ├── events.py
│   │       ├── analytics.py
│   │       └── orders.py
│   └── worker/
│       ├── init.py
│       ├── celery_app.py
│       └── tasks/
│           ├── init.py
│           ├── notifications.py
│           └── events.py
├── tests/
│   ├── init.py
│   └── test_auth.py
├── migrations/
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .env.example
└── README.md


---

## Features

| Feature | Implementation |
|---------|---------------|
| **Auth** | Register, Login, JWT Access + Refresh tokens, Redis blacklist logout |
| **Notifications** | Create notification → Queue Celery task → Simulate send → Update status |
| **Events** | Ingest events (with/without auth), query by type/user |
| **Analytics** | Dashboard stats: total events, today's events, weekly events, events by type |
| **Orders** | Create order (simulated payment) → Auto-create notification → Return order |
| **Billing** | View user's billing records (protected) |

## Next Steps

1. **Run it**: `docker compose up --build`
2. **Test auth**: `POST /api/v1/auth/signup` → `POST /api/v1/auth/login`
3. **Create an order**: `POST /api/v1/orders` (requires auth header)
4. **Check notifications**: `GET /api/v1/notifications`
5. **Ingest events**: `POST /api/v1/events/ingest`
6. **View analytics**: `GET /api/v1/analytics/dashboard`

