#DOCKER LOCAL DEV
docker-up:
	docker compose up
docker-down:
	docker compose down --remove-orphans
migrate:
	docker exec -i backend python manage.py migrate
superuser:
	docker exec -it backend python manage.py createsuperuser
static:
	docker exec -i backend python manage.py collectstatic --noinput

#DOCKER PROD-CONTAINER TESTING ON DEV
docker-dev:
	docker compose -f docker-compose-dev.yml up -d
docker-down-clear:
	docker compose -f docker-compose-dev.yml down -v --remove-orphans

#DOCKER BUILD AND PUSH ON PRODUCTION
docker-prod:
	REGISTRY=cr.selcloud.ru/soulwarm IMAGE_TAG=master-1 make docker-build docker-push

docker-build: docker-build-backend docker-build-nginx docker-build-react docker-build-db

docker-build-backend:
	DOCKER_BUILDKIT=1 docker --log-level=debug build --pull --build-arg BUILDKIT_INLINE_CACHE=1 \
		--platform linux/amd64 \
    	--tag ${REGISTRY}/backend:${IMAGE_TAG} \
    	--file ./docker/production/Django/Dockerfile .
docker-build-nginx:
	DOCKER_BUILDKIT=1 docker --log-level=debug build --pull --build-arg BUILDKIT_INLINE_CACHE=1 \
		--platform linux/amd64 \
    	--tag ${REGISTRY}/nginx:${IMAGE_TAG} \
    	--file ./docker/production/Nginx/Dockerfile .
docker-build-react:
	DOCKER_BUILDKIT=1 docker --log-level=debug build --pull --build-arg BUILDKIT_INLINE_CACHE=1 \
		--platform linux/amd64 \
    	--tag ${REGISTRY}/react:${IMAGE_TAG} \
    	--file ./docker/production/React/Dockerfile .
docker-build-db:
	DOCKER_BUILDKIT=1 docker --log-level=debug build --pull --build-arg BUILDKIT_INLINE_CACHE=1 \
	    --platform linux/amd64 \
    	--tag ${REGISTRY}/db:${IMAGE_TAG} \
    	--file ./docker/production/DB/Dockerfile .

docker-push:
	docker push ${REGISTRY}/backend:${IMAGE_TAG}
	docker push ${REGISTRY}/nginx:${IMAGE_TAG}
	docker push ${REGISTRY}/react:${IMAGE_TAG}
	docker push ${REGISTRY}/db:${IMAGE_TAG}

#DEPLOY
deploy:
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'docker network create --driver=overlay traefik-public || true'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'rm -rf soulwarm_${BUILD_NUMBER} && mkdir soulwarm_${BUILD_NUMBER}'

	envsubst < docker-compose-production.yml > docker-compose-production-env.yml
	scp -o StrictHostKeyChecking=no -P ${PORT} docker-compose-production-env.yml deploy@${HOST}:soulwarm_${BUILD_NUMBER}/docker-compose.yml
	rm -f docker-compose-production-env.yml

	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd soulwarm_${BUILD_NUMBER} && docker stack deploy --compose-file docker-compose.yml soulwarm --with-registry-auth --prune'
