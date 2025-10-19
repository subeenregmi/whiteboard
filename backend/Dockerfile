FROM python:3.13-slim

WORKDIR /app

RUN pip install poetry

COPY poetry.lock pyproject.toml /app/

RUN poetry install

COPY src /app/src

EXPOSE 8000

WORKDIR /app/src
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
# CMD ["poetry", "run", "fastapi", "dev", "main.py" ]
