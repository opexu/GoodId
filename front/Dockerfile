FROM node:16-alpine as goodid-front
USER node
WORKDIR /usr/src/app
COPY --chown=node:node \
    ./package.json \
    ./package-lock.json \
    ./vite.config.js \
    ./tailwind.config.js \
    ./postcss.config.js \
    ./env.d.ts \
    ./tsconfig.json \
    ./
RUN npm ci

CMD ["npm", "run", "dev"]