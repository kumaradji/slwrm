FROM node:18-alpine

# Установка рабочей директории
WORKDIR /app/frontend

# Копируем весь проект
COPY ./frontend .

# Запуск сервера React
RUN npm install -g serve