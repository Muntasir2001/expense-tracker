# Expense Tracker

## Live Demo
https://expense.noobdev54.com/

## Instructions to run the app

1. Install Docker from [here](https://www.docker.com/products/docker-desktop/).
2. Make sure Docker is up and running after installation.
3. Run the following commands in sequence to spin up the app on your machine:

```
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

4. After everything runs well, visit http://localhost
