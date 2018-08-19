sudo chown -R chris:chris .
docker-compose -f docker-compose.yml -f docker-compose-dev.yml stop
docker-compose -f docker-compose.yml -f docker-compose-dev.yml rm -f 
docker-compose -f docker-compose.yml -f docker-compose-dev.yml build
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up
