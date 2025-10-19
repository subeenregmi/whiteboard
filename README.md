# Whiteboard App

little whiteboard - currently in development :)

## Dependencies

- [poetry](https://python-poetry.org/)

## Setup

### Docker
```bash
docker compose up --build
```

### Locally

1. Setup backend locally

```bash
cd backend
poetry env activate
poetry install
poetry run uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

2. Setup frontend locally

```bash
cd frontend
npm install 
npm run dev
```

## Services

| Service  | Port |
|----------|------|
| redis    | 6379 |
| frontend | 3000 |
| backend  | 8000 | 
