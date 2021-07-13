const FJ = require('../models/fj')
const Game = require('../models/game')
const Group = require('../models/group')
const User = require('../models/user')

exports.ping = async (req, res) => {
    return res.status(200).json({ message: 'Hi there!'})
}

exports.new = async (req, res) => { // User Register, redirected from mx-auth

}

exports.load = async (req, res) => { // User Login, redirected from mx-auth

}

exports.save = async (req, res) => { // Data sync from client if this copy is too old or the client gains network after loss

}