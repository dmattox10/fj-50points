const dotenv = require('dotenv')
dotenv.config()

const {
    APP_PORT,
    APP_NAME,
    SHARED_SECRET,
    REFRESH_SECRET,
    ENVIRONMENT,
    MONGO_HOST, 
    MONGO_PORT, 
    MONGO_USER, 
    MONGO_PASS,
} = process.env

let MONGO_URI = (env = ENVIRONMENT) => {
    let URI = ''
    if (env === 'testing') {
        URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@mongo:27017/${APP_NAME}?authSource=admin`
    } else if (env === 'prod') {   
        
        URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${APP_NAME}?authSource=admin`
    } else {
        URI = `mongodb://localhost:27017/${APP_NAME}`
    }
    return URI
}


module.exports = {
    APP_PORT,
    SHARED_SECRET,
    REFRESH_SECRET,
    MONGO_URI,
    APP_NAME,
}