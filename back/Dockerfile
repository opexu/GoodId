FROM node:16-alpine as goodid-back
USER node
WORKDIR /usr/src/app
COPY --chown=node:node \
    ./package.json \
    ./package-lock.json \
    ./tsconfig.json \
    ./tsconfig.build.json \
    ./nest-cli.json \
    ./

RUN npm ci 

COPY --chown=node:node ./src ./src

# DEVELOPMENT MODE
CMD [ "npm", "run", "start:dev" ]

# PRODUCTION MODE
#CMD [ "npm", "run", "start" ]
