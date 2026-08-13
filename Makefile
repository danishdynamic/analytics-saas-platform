.PHONY: help up down restart logs build migrate ps clean seed shell-backend shell-db

# Default target when typing just 'make'
.DEFAULT_GOAL := help

help: ## Show this help message
	@echo "Analytics SaaS Infrastructure Commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

up: ## Start all Docker containers in detached mode
	docker compose up -d

build: ## Rebuild and start all containers
	docker compose up --build -d

down: ## Stop all containers
	docker compose down

restart: ## Restart all containers
	docker compose restart

logs: ## Stream unified logs from all services
	docker compose logs -f

logs-backend: ## Stream FastAPI backend logs
	docker compose logs -f backend

logs-celery: ## Stream Celery worker logs
	docker compose logs -f celery_worker

logs-frontend: ## Stream React frontend logs
	docker compose logs -f frontend

ps: ## View running container status and ports
	docker compose ps

migrate: ## Run Alembic database migrations
	docker compose exec backend alembic upgrade head

migration: ## Create a new migration revision (Usage: make migration m="add_new_table")
	docker compose exec backend alembic revision --autogenerate -m "$(m)"

shell-backend: ## Open interactive bash shell in backend container
	docker compose exec backend bash

shell-db: ## Connect to PostgreSQL via psql inside PgBouncer
	docker compose exec db psql -U postgres -d saas_db

clean: ## Stop containers and purge persistent data volumes
	docker compose down -v