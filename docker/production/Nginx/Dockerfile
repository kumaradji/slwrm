### Node.js ###
FROM node:18-alpine AS builder

# Установка рабочей директории
WORKDIR /app/frontend

# Копирование необходимых файлов для сборки Node.js
COPY ./frontend/package.json ./frontend/package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY ./frontend ./

# Собираем билд
RUN npm run build

FROM nginx:1.27.0-alpine

# Удаляем базовый конфиг Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем свой конфиг для Nginx
COPY ./docker/production/Nginx/conf.d /etc/nginx/conf.d

# Установка рабочей директории
WORKDIR /app

# Копируем из билда статическую сборку
COPY --from=builder /app/frontend/build ./frontend/