const express = require('express')
const route = express.Router()
const AuthController = require('../controllers/AuthController')

//Call Controller

route.get('/login', AuthController.login)
route.post('/login', AuthController.loginPost)
route.get('/register', AuthController.register)
route.post('/register', AuthController.registerPost)
route.get('/logout', AuthController.logout)

module.exports = route