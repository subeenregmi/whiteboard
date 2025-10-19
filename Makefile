build:
	@docker compose build

up:
	@docker compose up -d 

down:
	@docker compose down

flush-cache:
	@docker exec -it whiteboard-redis redis-cli FLUSHALL

