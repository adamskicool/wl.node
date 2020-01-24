# Workout Logger REST API

This is the REST API for the WorkoutLogger application. It uses TypeORM for database communication.

## How to set up project locally
To set up this project on you local machine, do the following:
- download `Docker` desktop client

## How to run tests
To run tests locally, use shell scripts in `runners` folder:
- `sh runners/docker-compose-test.sh` - run all tests
- `sh runners/docker-compose-test-watch.sh` - run all tests and watch for changes
- `sh runners/docker-compose-test-coverage.sh` - run all tests and with code coverage results

## Travis CI
This project uses Travis CI as a tool for Continous Integration on GitHub. The setup for Travis CI lives in the file `.travis.yml`. The tests make use of docker-compose to run the tests. In the future, integration can easily be added, the database is already set up in `docker-compose.test.ci.yml`.

