### Node.js ###
FROM node:20-alpine AS builder

# Установка рабочей директории
WORKDIR /app/frontend

# Копируем package для установки зависимостей
COPY ./frontend/package.json .

RUN npm install

# Копируем весь проект
COPY ./frontend .

# Собираем билд
RUN npm run build

FROM node:20-alpine

RUN npm install -g serve

WORKDIR /app/frontend