build:
	@docker compose build

up:
	@docker compose up -d 

up-attached:
	@docker compose up

down:
	@docker compose down

flush-cache:
	@docker exec -it whiteboard-redis redis-cli FLUSHALL

attach-redis:
	@docker exec -it whiteboard-redis redis-cli
