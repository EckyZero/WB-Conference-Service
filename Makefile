build:
	@docker-compose build

run:
	@docker-compose up --detach

stop:
	@docker-compose stop

clean:
	@echo stopping containers
	@docker-compose stop
	@echo removing containers
	@docker-compose rm -f

make list:
	@docker ps --all
