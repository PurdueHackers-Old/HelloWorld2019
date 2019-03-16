FROM node:lts
ENV APP_PATH /usr/app

WORKDIR ${APP_PATH}
COPY ["package.json", "yarn.lock*", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

ENV PATH ${APP_PATH}/node_modules/.bin:$PATH
COPY . .

RUN yarn
EXPOSE 5000

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait && yarn dev
