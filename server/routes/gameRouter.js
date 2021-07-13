const express = require('express')
const ExpressBrute = require('express-brute')
const gameController = require('../controllers/gameController')
const gameRouter = express.Router()
const store = new ExpressBrute.MemoryStore()
const bruteforce = new ExpressBrute(store)

gameRouter.get('/ping', Cors(), bruteforce.prevent, gameController.ping)

module.exports = gameRouter
