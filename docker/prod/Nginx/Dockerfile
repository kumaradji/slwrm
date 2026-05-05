FROM nginx:1.27.0-alpine

# Удаляем базовый конфиг Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем свой конфиг для Nginx
COPY ./docker/prod/Nginx/default.conf /etc/nginx/conf.d

# Установка рабочей директории
WORKDIR /app