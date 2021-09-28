# FJ, 50 Points!
Calling out an FJ you see driving, nets you points, and this is how you keep track of your party's score, and if you would like, participate in Honor System scoring and leaderboards.

## Development

### Sample .env
    APP_PORT=5000
    APP_NAME=fj
    SHARED_SECRET="somethingsecret"
    REFRESH_SECRET="somethingelsesecret"
    MONGO_USER=username
    MONGO_PASS="securepasswordwithspecialcharacters"

### Sample Docker-Compose (no secrets file yet)
    ---
    version: '3.7'

    services:
      server:
        build:
          context: ./server
          dockerfile: Dockerfile
        image: fj-server
        container-name: fj-node-server
        command: /usr/src/app/node_modules/.bin/nodemon server.js
        volumes:
          - ./server:/usr/src/app
          - /usr/src/app/node_modules
        ports:
          - "5000:5000"
        depends_on:
          - mongo
        env_file: ./server/.env
        environment:
          - NODE_ENV=development
        networks:
          - fj-network
      mongo:
        image: mongo
        container_name: mongo
        environment: 
          MONGO_INITDB_ROOT_USERNAME: USERNAME
          MONGO_INITDB_ROOT_PASSWORD: PASSWORD
        volumes:
          - ./db:/data/db
        ports:
          - "27017:27017"
        networks:
          - fj-network
      client:
        build:
          context: ./client
          dockerfile: Dockerfile
        image: fj-client
        container-name: fj-react-client
        command: yarn start
        volumes:
          - ./client:/usr/app
          - /usr/app/node_modules
        ports:
          - "3000:3000"
        depends_on:
          - server
        networks:
          - fj-network

    networks:
      fj-network:
        driver: bridge

    volumes:
      data-volume:
      node_modules:
      web-root:
        driver: local

## Notes

## TODO
