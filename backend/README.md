# 🚀 Ecommerce Analytics SaaS Platform — Backend

> An asynchronous, productionbready REST API powering the Analytics SaaS Platform. Built with FastAPI, PostgreSQL, PgBouncer, Redis, and Celery.

![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![PgBouncer](https://img.shields.io/badge/PgBouncer-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Celery](https://img.shields.io/badge/Celery-37814D?style=for-the-badge&logo=celery&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## 🛠️ Tech Stack

Component | Technology | Icon | Purpose |
------    | ------   | ----- | ------   |
Framework | FastAPI | ⚡ | High performance asynchronous web framework |
Database | PostgreSQL | 🐘 | Primary relational datastore |
ORM & Migrations | SQLAlchemy 2.0 + Alembic | ⚙️ | Async ORM and automated database migrations |
Connection Pool | PgBouncer |🔌| Lightweight connection pooler for PostgreSQL |
Task Queue | Celery + RabbitMQ | 🥬 🐇 | Asynchronous background worker and message broker |
Caching & Auth | Redis | 🔴 | In memory store for response caching and JWT blacklisting |
Containerization | Docker + Docker Compose | 🐳 | Multi container environment orchestration |
Testing | Pytest | 🧪 | Automated unit and integration testing suite |

---

## 📐 Architecture & System Flow

**System Overview**

```mermaid
graph TD
    subgraph Client Layer
        FE[💻 Frontend / React App]
    end

    subgraph Application Layer
        API[⚡ FastAPI Web Server]
    end

    subgraph Cache & Security
        REDIS[(🔴 Redis Store)]
    end

    subgraph Database Layer
        PGB[🔌 PgBouncer :6432]
        DB[(🐘 PostgreSQL :5432)]
    end

    subgraph Background Workers
        RMQ[🐇 RabbitMQ Broker]
        CELERY[🥬 Celery Workers]
    end

    FE -->|HTTP / REST API| API
    API -->|Session & Token Blacklist| REDIS
    API -->|SQL Queries| PGB
    PGB -->|Pooled Connections| DB
    API -->|Publish Tasks| RMQ
    RMQ -->|Consume Tasks| CELERY
    CELERY -->|Read / Write Status| DB
```

---

## Request Flow & Data Topology

```mermaid
sequenceDiagram
    autonumber
    actor Client as 💻 Client
    participant API as ⚡ FastAPI
    participant Redis as 🔴 Redis
    participant PgB as 🔌 PgBouncer
    participant DB as 🐘 PostgreSQL
    participant MQ as 🐇 RabbitMQ
    participant Worker as 🥬 Celery Worker

    Client->>API: POST /api/v1/orders
    API->>Redis: Check JWT Blacklist
    Redis-->>API: Token Valid
    API->>PgB: INSERT order record
    PgB->>DB: Execute Transaction
    DB-->>API: Order Saved
    API->>MQ: Dispatch 'send_order_notification'
    API-->>Client: 201 Created (Order Response)
    
    par Async Processing
        MQ->>Worker: Consume Task
        Worker->>DB: Update Notification Status
    end
```

---

## ✨ Features

Feature | Implementation Details | Status |
| ---   | ---   |  ---  |
🔐 Authentication | Registration, login, JWT Access + Refresh token flow, Redis backed token revocation | ✅ Active |
🔔 Notifications | Asynchronous dispatch via Celery, execution tracking, persistent database status | ✅ Active |
📊 Event Ingestion | High throughput event logging (authenticated/anonymous) with custom event filtering | ✅ Active |
📈 Analytics Engine | Real time aggregated metrics: overall total, daily metrics, weekly distribution | ✅ Active |
🛒 Orders & Workflow | Order placement with simulated payments and automatic notification event triggers | ✅ Active |
💳 Billing Management | Protected user billing history and subscription metadata tracking |✅ Active |

----

## 📁 Directory Structure

```Plaintext
backend/
├── 📂 app/
│   ├── 📄 main.py                   # FastAPI app initialization & route mounting
│   ├── 📂 api/
│   │   └── 📂 v1/                   # Version 1 API Endpoints
│   │       ├── 📄 analytics.py       # Metrics & dashboard stats
│   │       ├── 📄 auth.py            # Signup, login, logout, refresh tokens
│   │       ├── 📄 billing.py         # Billing records & plan information
│   │       ├── 📄 events.py          # Event ingestion & querying
│   │       ├── 📄 health.py          # Liveness & readiness checks
│   │       ├── 📄 notifications.py   # Notification history
│   │       └── 📄 orders.py         # Order creation & handling
│   ├── 📂 core/                     # Application configurations & security
│   │   ├── 📄 config.py             # Pydantic environment settings
│   │   ├── 📄 dependencies.py       # FastAPI dependency injections
│   │   └── 📄 security.py           # Password hashing & JWT logic
│   ├── 📂 db/                       # Database connections & session factories
│   │   ├── 📄 base.py               # ORM Base imports for Alembic
│   │   ├── 📄 database.py           # SQLAlchemy engine & session setup
│   │   └── 📄 redis_client.py       # Redis client instance
│   ├── 📂 models/                   # SQLAlchemy Database Models
│   │   ├── 📄 billing.py
│   │   ├── 📄 event.py
│   │   ├── 📄 notification.py
│   │   ├── 📄 order.py
│   │   └── 📄 user.py
│   ├── 📂 schemas/                  # Pydantic Models / Data Validation
│   │   ├── 📄 event.py
│   │   ├── 📄 notification.py
│   │   ├── 📄 order.py
│   │   ├── 📄 token.py
│   │   └── 📄 user.py
│   ├── 📂 services/                 # Business logic abstraction
│   │   ├── 📄 auth_service.py
│   │   ├── 📄 event_service.py
│   │   ├── 📄 notification_service.py
│   │   └── 📄 order_service.py
│   └── 📂 worker/                   # Background tasks setup
│       ├── 📄 celery_app.py         # Celery instance configuration
│       └── 📂 tasks/                # Celery worker task definitions
│           ├── 📄 events.py
│           └── 📄 notifications.py
├── 📂 migrations/                   # Alembic database revision scripts
├── 📂 tests/                        # Pytest suite
│   └── 📄 test_auth.py
├── 📄 .env.example                  # Environment variable template
├── 📄 docker-compose.yml            # Multi-container service definitions
├── 📄 Dockerfile                    # Container image spec
├── 📄 README.md
└── 📄 requirements.txt              # Python dependencies
```

---

## 🔑 Environment Variables

ariable | Description | Default / Fallback Value |
| --- | --- | --- |
DATABASE_URL | PostgreSQL connection string | postgresql+psycopg2://postgres:postgres@db:5432/saas |
SECRET_KEY | HMAC secret key used for signing JWTs | supersecret |
ACCESS_TOKEN_EXPIRE_MINUTES | Lifetime of JWT access token | 15 |
REFRESH_TOKEN_EXPIRE_DAYS | Lifetime of JWT refresh token|7 |
CELERY_BROKER_URL |RabbitMQ connection string | amqp://guest:guest@rabbitmq// |
REDIS_URL | Redis connection URL | redis://redis:6379/0 |

---

## ⚡ Quick Start

### Option A: Docker Compose (Recommended)

1. Start all services (FastAPI, Postgres, Redis, RabbitMQ, Celery, PgBouncer):

```Bash
docker compose up --build
```
2. Access API Documentation:

- **Swagger UI**: ```http://localhost:8000/docs```

- **ReDoc**: ```http://localhost:8000/redoc```

### Option B: Local Development

1. Environment Setup:

```Bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment configuration
cp .env.example .env
```

2. Database Migrations:

```Bash
# Apply migrations to local PostgreSQL database
alembic upgrade head
```

3. Start Development Server:

```Bash
uvicorn app.main:app --reload
```

4. Run Test Suite:

```Bash
pytest
```

---

## 📌 API Routes Overview

Category| Method | Endpoint | Description | Auth Required |
--- | --- | --- | --- | --- |
Auth | POST | /api/v1/auth/signup | Register new user account | ❌ No |
Auth | POST | /api/v1/auth/login | Authenticate user & get access/refresh tokens | ❌ No |
Auth | POST |/api/v1/auth/logout | Revoke tokens (adds access token to Redis blacklist) | 🔑 Yes |
Orders | POST| /api/v1/orders | Create an order and queue a notification event |🔑 Yes |
Notifications |GET|/api/v1/notifications |Fetch user notification status history | 🔑 Yes |
Events |POST |/api/v1/events/ingest |Ingest platform usage/user events |⚡ Optional |
Events |GET |/api/v1/events |Query ingested events by type or user |🔑 Yes |
Analytics | GET | /api/v1/analytics/dashboard | Aggregated dashboard stats & metrics | 🔑 Yes |
Billing | GET | /api/v1/billing | Retrieve user billing history | 🔑 Yes |
System |GET |/health | Check API service health | ❌ No |

---

## 🚦 Verification Walkthrough

1. Register User: Execute ```POST /api/v1/auth/signup``` with email and password credentials.

2. Authenticate: Execute ```POST /api/v1/auth/login``` to obtain your ```access_token```.

3. Place Order: Execute ```POST /api/v1/orders``` with the Authorization: Bearer ```<access_token>``` header.

4. Verify Notification Queue: Execute ```GET /api/v1/notifications``` to verify that the background worker picked up and processed the notification.

5. Ingest Metrics: Send custom tracking payloads using ```POST /api/v1/events/ingest```.

6. Check Metrics: Query ```GET /api/v1/analytics/dashboard``` to view real time platform metrics