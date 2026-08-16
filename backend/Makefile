.PHONY: dev lint format check check-fix

# Mirrors the frontend's npm scripts (see ../frontend/package.json).

dev:
	cd src && poetry run uvicorn main:app --reload --port 8000

lint:
	poetry run ruff check src

format:
	poetry run ruff format src

check:
	poetry run ruff check src
	poetry run ruff format --check src
	poetry run pyright

check-fix:
	poetry run ruff check --fix src
	poetry run ruff format src
