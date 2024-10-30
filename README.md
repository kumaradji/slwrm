# ДушуГрею

## Описание
Веб-приложение, созданное с использованием Django на серверной стороне и React на клиентской стороне. Проект включает в себя функциональность чатов для обычных пользователей и VIP-пользователей, а также мастер-классы и корзину для покупок.

## Запуск проекта локально

### Backend

1. Перейти в директорию backend:

```
cd backend
```

2. Скопировать и заполнить значение переменных .env:

```
cp .env.dev.example .env
```

3. Создать виртуальное окружение и активировать его:

```
python -m venv venv
source venv/bin/activate
```

4. Установить зависимости:

```
pip install -r requirements.txt
```

5. Применить миграции для настройки базы данных:

```
python manage.py makemigrations
python manage.py migrate
```

6. Создать суперпользователя для доступа к административной панели:

```
python manage.py createsuperuser
```

7. Для заполнения базы данных первичными данными выполните команду:

```
python manage.py loaddata main/fixtures/initial_data.json
```

8. Для сборки статики Django выполните команду:

```
python manage.py collectstatic --noinput
```

### React

1. Перейти в директорию клиента и установить зависимости:

```
cd ..
cd frontend
npm install
```

2. Сделать сборку проекта:

```
npm run build
```

## Запуск всех сервисов с помощью Docker Compose

1. Перейти в корень проекта:

```
cd ..
```

2. Запустить проект с помощью Docker Compose:

```
make docker-up
```

3. Остановка всех сервисов Docker Compose:

```
make docker-down
```

## Деплой руками, без CI/CD

1. Для сборки и пуша контейнеров в Registry Selectel выполните команду:

```
make docker-prod
```

## Лицензия
Этот проект лицензирован под MIT License - подробности см. в файле [LICENSE](LICENSE).