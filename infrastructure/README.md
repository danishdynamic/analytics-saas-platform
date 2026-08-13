# 🏗️ Infrastructure & Services — Analytics SaaS & E Commerce

Infrastructure deployment guide for the Analytics SaaS & E Commerce Platform. This setup orchestrates a multi container stack featuring FastAPI, React (Vite), PostgreSQL with PgBouncer, Redis, RabbitMQ, and Celery.
 
---

## 🛠️ Infrastructure Tech Stack & Shields

| Layer | Technology | Badge | Purpose |
| :--- | :--- | :--- | :--- |
| **Container Engine** | Docker | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Containerization & isolated environments |
| **Orchestration** | Docker Compose v3.8 | ![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=flat-square&logo=docker&logoColor=white) | Multi container setup & local networking |
| **Database** | PostgreSQL 16 | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white) | Primary relational data store |
| **Connection Pool** | PgBouncer | ![PgBouncer](https://img.shields.io/badge/PgBouncer-336791?style=flat-square&logo=postgresql&logoColor=white) | Transaction connection pooling for Postgres |
| **In-Memory Store** | Redis 7 | ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white) | JWT blacklist, response cache & key-value store |
| **Message Broker** | RabbitMQ 3 | ![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=flat-square&logo=rabbitmq&logoColor=white) | AMQP queue broker for background tasks |
| **Task Queue** | Celery | ![Celery](https://img.shields.io/badge/Celery-37814D?style=flat-square&logo=celery&logoColor=white) | Asynchronous task execution workers |

---

## 🌐 Network Architecture & Topology

```mermaid
graph TD
    subgraph Public Gateway
        FE[💻 Frontend / React Dev Server :5173]
        API[⚡ FastAPI Backend :8000]
    end

    subgraph Internal Network: saas_network
        direction TB

        subgraph Connection Pooling & Database
            PGB[🔌 PgBouncer :6432]
            DB[(🐘 PostgreSQL :5432)]
        end

        subgraph In-Memory Cache & Token Store
            REDIS[(🔴 Redis :6379)]
        end

        subgraph Asynchronous Task Dispatch
            RMQ[🐇 RabbitMQ Broker :5672]
            CELERY[🥬 Celery Worker]
        end
    end

    FE -->|HTTP Requests| API
    API -->|Session & Blacklist| REDIS
    API -->|SQL Queries| PGB
    PGB -->|Transaction Pooling| DB
    API -->|Queue Tasks| RMQ
    RMQ -->|Deliver Messages| CELERY
    CELERY -->|Read / Write Status| DB
```

---

## ⚙️ Container Orchestration Matrix

Service Name | Container Image / Source | Internal Port | Host Port | Purpose & Responsibility |
--- | --- | --- | --- | --- |
frontend | ./frontend (Node 20 Dev) | 5173 | 5173 | React SPA dev server with Hot Module Replacement (HMR) |
backend | ./backend (Python 3.11) | 8000 | 8000 | FastAPI application server serving REST APIs | 
db | postgres:16-alpine | 5432 | (Internal) | Persistent relational database store |
pgbouncer | edoburu/pgbouncer | 6432 | 6432 | Lightweight transaction connection pooler for PostgreSQL |
redis | redis:7-alpine,6379,6379 | Token blacklist | response cache | and fast key-value store |
rabbitmq | rabbitmq:3-management-alpine | 5672 , 15672 |15672 | AMQP message broker & management dashboard |
celery_worker | ./backend (Celery worker) | — | — | Executes asynchronous background tasks and notification queues |

---

## 🐳 Complete docker-compose.yml

Place this in the root directory of your repository:

```Docker
version: '3.8'

networks:
  saas_network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
  rabbitmq_data:

services:
  # 🐘 PostgreSQL Primary Database
  db:
    image: postgres:16-alpine
    container_name: saas_postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgrespassword
      POSTGRES_DB: saas_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - saas_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d saas_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  # 🔌 PgBouncer Connection Pooler
  pgbouncer:
    image: edoburu/pgbouncer
    container_name: saas_pgbouncer
    restart: always
    environment:
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: postgres
      DB_PASSWORD: postgrespassword
      DB_NAME: saas_db
      POOL_MODE: transaction
      MAX_CLIENT_CONN: 100
      DEFAULT_POOL_SIZE: 20
    ports:
      - "6432:6432"
    depends_on:
      db:
        condition: service_healthy
    networks:
      - saas_network

  # 🔴 Redis Cache & Token Blacklist
  redis:
    image: redis:7-alpine
    container_name: saas_redis
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - saas_network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

  # 🐇 RabbitMQ Task Broker
  rabbitmq:
    image: rabbitmq:3-management-alpine
    container_name: saas_rabbitmq
    restart: always
    environment:
      RABBITMQ_DEFAULT_USER: guest
      RABBITMQ_DEFAULT_PASS: guest
    ports:
      - "5672:5672"    # AMQP protocol
      - "15672:15672"  # Management UI
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    networks:
      - saas_network
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "-q", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # ⚡ FastAPI REST API Backend
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: saas_backend
    restart: always
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql+psycopg2://postgres:postgrespassword@pgbouncer:6432/saas_db
      REDIS_URL: redis://redis:6379/0
      CELERY_BROKER_URL: amqp://guest:guest@rabbitmq:5672//
      SECRET_KEY: supersecretkeyforjwt
    depends_on:
      pgbouncer:
        condition: service_started
      redis:
        condition: service_healthy
      rabbitmq:
        condition: service_healthy
    networks:
      - saas_network

  # 🥬 Celery Background Worker
  celery_worker:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: saas_celery_worker
    restart: always
    command: celery -A app.worker.celery_app worker --loglevel=info
    volumes:
      - ./backend:/app
    environment:
      DATABASE_URL: postgresql+psycopg2://postgres:postgrespassword@pgbouncer:6432/saas_db
      REDIS_URL: redis://redis:6379/0
      CELERY_BROKER_URL: amqp://guest:guest@rabbitmq:5672//
    depends_on:
      - backend
      - rabbitmq
    networks:
      - saas_network

  # 💻 React + Vite Frontend Dev Server
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: saas_frontend
    restart: always
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      VITE_API_BASE_URL: http://localhost:8000/api/v1
    depends_on:
      - backend
    networks:
      - saas_network
```
---

## ⚡ Infrastructure Operations Guide

### 🚀 Bootstrapping the Infrastructure

Run this command in the root directory to build and spin up all containers:

```Bash
docker compose up --build -d
```

### 📊 Health & Logs Monitoring
```Bash
# View active container status
docker compose ps

# Stream unified stack logs
docker compose logs -f

# View logs for specific components
docker compose logs -f backend
docker compose logs -f celery_worker
docker compose logs -f pgbouncer
```

### 🗄️ Database Migrations via PgBouncer

Run database migrations through Alembic inside the backend container:

```Bash
docker compose exec backend alembic upgrade head
```

### 🧹 Teardown & Reset

```Bash
# Stop all containers while preserving data volumes
docker compose down

# Wipe all containers, networks, and persistent volume storage (Fresh Reset)
docker compose down -v
```

### 🔌 Service Dashboards & Debug Endpoints

Portal| URL | 	Credentials |
--- | --- | --- |
Frontend Application |	```http://localhost:5173```	| N/A |
FastAPI Swagger UI | 	```http://localhost:8000/docs``` |	N/A |
RabbitMQ Management Dashboard	| ```http://localhost:15672``` |	guest / guest |
PgBouncer Admin Console	| ```psql -h localhost -p 6432 -U postgres pgbouncer``` |	postgres |