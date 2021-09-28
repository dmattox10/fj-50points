# Build node_modules
FROM node:16-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn

#Build final image
FROM node:16-alpine
RUN apk add dumb-init
EXPOSE 5000
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app
CMD ["dumb-init", "node", "server.js"]