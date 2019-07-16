# Hello World 2019 [![Build Status](https://travis-ci.com/ashwinGokhale/HelloWorld2019.svg?branch=master)](https://travis-ci.com/ashwinGokhale/HelloWorld2019)

# Getting started

### Prerequisites

-   [NodeJS](https://nodejs.org/en/)
-   [MongoDB](https://docs.mongodb.com/manual/installation/)
-   [Yarn](https://yarnpkg.com/en/docs/install)
-   [Homebrew](https://brew.sh/) \*Only on Mac
-   [Docker](https://www.docker.com/)
-   [Docker Compose](https://docs.docker.com/compose/install/)
-   [Mkcert](https://github.com/FiloSottile/mkcert) \* For https on localhost

### Usage with Docker

-   Prerequisites:
    1. `mkcert localhost 127.0.0.1 ::1`
    2. `mkcert -install`
    3. `yarn web-push generate-vapid-keys`
        - Copy the values to "VAPID_PUBLIC" and "VAPID_PRIVATE" in your .env
-   To start: `docker-compose up`
    -   Open https://localhost:5000 to view the app
    -   Open http://localhost:8081 to view [mongo-express](https://github.com/mongo-express/mongo-express)
-   To stop: 1. Ctrl+C when inside `docker-compose up` \* OR 2. `docker-compose down`
-   To build: `docker-compose build`

*   NOTE: All of these commands are available as runnable tasks within VSCode

### Usage without Docker

1. `mkcert localhost 127.0.0.1 ::1`
2. `mkcert -install`
3. `yarn`
4. `yarn web-push generate-vapid-keys`
    - Copy the values to "VAPID_PUBLIC" and "VAPID_PRIVATE" in your .env
5. Edit .env
6. Make sure MongoDB is running:
    - `mongod`
7. `yarn dev`
8. Open https://localhost:5000

## Technologies used:

#### Frontend:

-   [NextJS](https://nextjs.org/)
-   [ReactJS](https://reactjs.org/)
-   [ReduxJS](https://redux.js.org/)

#### Backend:

-   [TypeScript](https://www.typescriptlang.org/)
-   [Mongoose](https://mongoosejs.com/)
-   [ExpressJS](https://expressjs.com/)
-   [Routing Controllers](https://github.com/typestack/routing-controllers)
