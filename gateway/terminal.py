version: '3.4'
services:
  db:
    image: postgres
    env_file: .env
    volumes:
      - ./pgdata:/var/lib/postgresql/data
    ports:
      - '5435:5432'
  maria:
    image: mariadb
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: test
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    volumes:
      - ./data:/var/lib/mysql
    ports:
      - "3306:3306"
      #mariadb --host localhost --port 3306 --user root --password test
  postgres:
    image: postgres:13.3
    environment:
      POSTGRES_DB: "product-service-db"
      POSTGRES_USER: "product-service"
      POSTGRES_PASSWORD: "product-service"
    volumes:
      - ./pgdata2:/var/lib/postgresql/data
    ports:
      - "5433:5432"
  rabbitmq:
    image: rabbitmq:latest
    hostname: rabbitmq
    restart: always
    environment:
      - RABBITMQ_DEFAULT_USER=rmuser
      - RABBITMQ_DEFAULT_PASS=rmpassword
    volumes:
      - ./rabbitmq:/var/lib/rabbitmq
    ports:
      - 15672:15672
      - 5672:5672
