### Builder ###
FROM python:3.10-slim AS builder

# Установка рабочей директории
WORKDIR /app/backend

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Копируем requirements для установки зависимостей
COPY ./backend/requirements.txt .

# Устанавливаем зависимости
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/backend/wheels -r requirements.txt

### Final image ###
FROM python:3.10-slim

# Установка необходимых пакетов в систему Linux
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libpq-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Копируем из билдера установленные зависимости
COPY --from=builder /app/backend/wheels /wheels
COPY --from=builder /app/backend/requirements.txt .

RUN pip install --no-cache /wheels/*

# Установка рабочей директории
WORKDIR /app/backend