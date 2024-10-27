# ДушуГрею

## Описание
Веб-приложение, созданное с использованием Django на серверной стороне и React на клиентской стороне. Проект включает в себя функциональность чатов для обычных пользователей и VIP-пользователей, а также мастер-классы и корзину для покупок.

## Установка
1. Клонировать репозиторий
2. Перейти в директорию проекта
3. Перейти в директорию backend и скопировать .env-файл

```
cd backend/
cp .env.prod.example .env
```

## Запуск всех сервисов с помощью Docker Compose
4. Запустить проект с помощью Docker Compose:
```sh
docker compose up -d --build
```

5. Остановка всех сервисов Docker Compose:
```sh
docker compose down -v
```

## Лицензия
Этот проект лицензирован под MIT License - подробности см. в файле [LICENSE](LICENSE).