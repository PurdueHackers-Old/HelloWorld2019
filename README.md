# Hello World 2019 [![Build Status](https://travis-ci.com/ashwinGokhale/HelloWorld2019.svg?branch=master)](https://travis-ci.com/ashwinGokhale/HelloWorld2019)

# Getting started

### Prerequisites

-   [NodeJS](https://nodejs.org/en/)
-   [MongoDB](https://docs.mongodb.com/manual/installation/)
-   [Yarn](https://yarnpkg.com/en/docs/install)
-   [Homebrew](https://brew.sh/) \*Only on Mac
-   [Docker](https://www.docker.com/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

### Usage with Docker

-   To start: `docker-compose up`
    -   Open http://localhost:5000 to view the app
    -   Open http://localhost:1234 to view [adminMongo](https://adminmongo.markmoffat.com/)
-   To stop: 1. Ctrl+C when inside `docker-compose up` \* OR 2. `docker-compose down`
-   To build: `docker-compose build`

### Usage without Docker

1. `yarn`
2. Edit .env
3. Make sure MongoDB is running:
    - `mongod`
4. `yarn dev`
5. Open http://localhost:5000

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
