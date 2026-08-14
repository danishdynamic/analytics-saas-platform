# 🚀 Full Stack Analytics SaaS & E-Commerce Platform

> A production grade, full stack monorepo featuring a high performance FastAPI backend coupled with a modern React + Vite frontend. Built for real time analytics tracking, background job processing, and scalable e commerce workflows.

---
## Demo

![Analytics](public/../frontend/public/Screenshot_analytics.png)






| Cart | Notification |
| :---: | :---: |
| ![Cart](public/../frontend/public/Screenshot_cart.png) |![Notification](public/../frontend/public/Screenshot_notifications.png)|


---

## 🛠️ Tech Stack & Shields

### Backend

| Layer | Technology | Badge | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | FastAPI | ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) | Async REST API & OpenAPI docs |
| **Database** | PostgreSQL | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white) | Relational primary data store |
| **Pooler** | PgBouncer | ![PgBouncer](https://img.shields.io/badge/PgBouncer-336791?style=flat-square&logo=postgresql&logoColor=white) | Connection pooling |
| **Cache & Auth** | Redis | ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white) | JWT blacklist & caching |
| **Task Queue** | Celery | ![Celery](https://img.shields.io/badge/Celery-37814D?style=flat-square&logo=celery&logoColor=white) | Asynchronous background jobs |
| **Broker** | RabbitMQ | ![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=flat-square&logo=rabbitmq&logoColor=white) | Message broker for Celery |
| **DevOps** | Docker | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Service containerization |

### Frontend

| Layer | Technology | Badge | Purpose |
| :--- | :--- | :--- | :--- |
| **UI Library** | React 18 | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) | Declarative UI views |
| **Build Tool** | Vite | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Dev server & production bundler |
| **Styling** | Tailwind + DaisyUI | ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | Utility-first styling & UI components |
| **Data Fetching**| TanStack Query | ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=react-query&logoColor=white) | Server state management & caching |
| **State** | Zustand | ![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat-square&logo=react&logoColor=white) | Client state (Auth, Cart) |
| **HTTP Client** | Axios | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) | API calls & auth interceptors |
| **Charts** | Recharts | ![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=flat-square&logo=chartdotjs&logoColor=white) | Analytics visualizations |

---

## 🏗️ System Architecture


```mermaid
graph TD
    subgraph Frontend Layer
        FE[💻 React + Vite App]
        RQ[🔄 React Query / Axios]
        ZS[⚡ Zustand Global Stores]
        FE --- RQ
        FE --- ZS
    end

    subgraph API Layer
        API[⚡ FastAPI Web Server]
    end

    subgraph Cache & Token Blacklist
        REDIS[(🔴 Redis)]
    end

    subgraph Database Layer
        PGB[🔌 PgBouncer :6432]
        DB[(🐘 PostgreSQL :5432)]
    end

    subgraph Asynchronous Task Queue
        RMQ[🐇 RabbitMQ Broker]
        CELERY[🥬 Celery Worker]
    end

    FE -->|HTTP / REST API| API
    API -->|Session / Token Revocation| REDIS
    API -->|SQL Queries| PGB
    PGB -->|Connection Pooling| DB
    API -->|Dispatch Background Tasks| RMQ
    RMQ -->|Consume Messages| CELERY
    CELERY -->|Update Execution Status| DB
```

---

## ✨ Key Features & Implementation

| Feature|Implementation|Tech Used|
--- | --- |  --- |
Authentication| Registration, Login, JWT Access/Refresh tokens, Redis blacklist logout | FastAPI, Redis, Axios Interceptors, Zustand |
Notifications | Create order → Queue Celery task → Simulate dispatch → Update live UI | Celery, RabbitMQ, PostgreSQL, React Query |
Event Ingestion | Ingest custom analytics (authenticated/anonymous) by user & type | FastAPI, SQLAlchemy, useAnalytics Hook |
Analytics Dashboard | Real time aggregate statistics: total, daily, and weekly metric charts | Recharts, FastAPI, PostgreSQL |
E-Commerce & Orders | Product catalog, cart management, simulated payment, order creation | DaisyUI, Tailwind, Zustand, React Query |
Billing Management | Secure user subscription details and historical billing records | FastAPI, PostgreSQL, Protected Routes |

---

## 📁 Repository Structure

```Plaintext
.
├── backend/
│   ├── app/
│   │   ├── main.py                   # FastAPI initialization & route mounting
│   │   ├── api/v1/                   # Endpoint routers (auth, orders, events, etc.)
│   │   ├── core/                     # Security, config, and dependencies
│   │   ├── db/                       # Engine, session setup & Redis client
│   │   ├── models/                   # SQLAlchemy models
│   │   ├── schemas/                  # Pydantic validation schemas
│   │   ├── services/                 # Core business logic layer
│   │   └── worker/                   # Celery app & background task definitions
│   ├── tests/                        # Pytest suite
│   ├── migrations/                   # Alembic database revisions
│   ├── Dockerfile
│   └── requirements.txt
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── main.jsx                  # Application entry point
        ├── App.jsx                   # Router setup & global providers
        ├── api/                      # Axios HTTP modules per feature
        ├── store/                    # Zustand stores (authStore, cartStore, etc.)
        ├── hooks/                    # Custom React Query hooks
        ├── components/               # Reusable UI components
        └── pages/                    # Route pages (Shop, Cart, Dashboard, etc.)
```

---

## 🔌 Environment Variables

**Backend** ```(backend/.env)```

Variable | Description | Default |
--- | --- | --- | 
DATABASE_URL | PostgreSQL connection string | postgresql+psycopg2://postgres:postgres@db:5432/saas |
SECRET_KEY | HMAC key for signing JWTs | supersecret | 
ACCESS_TOKEN_EXPIRE_MINUTES| Access Token TTL | 15 |
REFRESH_TOKEN_EXPIRE_DAYS| Refresh Token TTL| 7 | 
CELERY_BROKER_URL| RabbitMQ connection URL| amqp://guest:guest@rabbitmq//|
REDIS_URL | Redis connection URL| redis://redis:6379/0|


**Frontend** ```(frontend/.env)```

Variable| Description | Default |
--- | --- | --- |
VITE_API_BASE_URL | Backend REST API endpoint | http://localhost:8000/api/v1 | 

---

## ⚡ Getting Started

### 🐳 Option 1: Docker Compose (Entire Stack)

Spin up all backend services (FastAPI, Postgres, PgBouncer, Redis, RabbitMQ, Celery) along with the frontend in a single command:

```Bash
docker compose up --build
```

Access the applications:

- **Frontend Application**: ```http://localhost:5173```

- **API Documentation (Swagger UI)**: ```http://localhost:8000/docs```

- **API Documentation (ReDoc)**: ```http://localhost:8000/redoc```

### 💻 Option 2: Local Manual Setup

1. Backend Setup

```Bash
cd backend

# Create & activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env

# Run database migrations
alembic upgrade head

# Start local server
uvicorn app.main:app --reload
```

2. Frontend Setup
   
```Bash
cd frontend

# Install dependencies
npm install react react-dom react-router-dom zustand axios @tanstack/react-query recharts lucide-react
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer daisyui@latest @types/react @types/react-dom

# Configure environment
cp .env.example .env

# Run development server
npm run dev
```

### 🧪 Testing

Run backend test suites using pytest:

```Bash
cd backend
pytest
```
