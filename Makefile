# LOCAL DEV
dev-up:
	docker compose up
dev-down:
	docker compose down --remove-orphans
dev-migrate:
	docker exec -i django python manage.py migrate
dev-superuser:
	docker exec -it django python manage.py createsuperuser
dev-static:
	docker exec -i django python manage.py collectstatic --noinput

# PROD
up:
	docker compose -f docker-compose-prod.yml up -d
build:
	docker compose -f docker-compose-prod.yml up -d --build
down:
	docker compose -f docker-compose-prod.yml down --remove-orphans
migrate:
	docker exec -i django python manage.py migrate
superuser:
	docker exec -it django python manage.py createsuperuser
static:
	docker exec -i django python manage.py collectstatic --noinput