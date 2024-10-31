FROM python:3.10-slim

# Устанавливаем рабочую директорию
WORKDIR /app/backend

# Устанавливаем переменные среды
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Установка необходимых пакетов в систему Linux
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    netcat-openbsd \
    libpq-dev && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Устанавливаем зависимости
COPY ./backend/requirements.txt .
RUN pip install -r requirements.txt

# Копируем весь проект
COPY ./backend .
