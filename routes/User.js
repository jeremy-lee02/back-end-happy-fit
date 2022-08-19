const express = require('express')
const auth = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()
auth.use(express.json())

const authController = require("../controllers/authController");

const middlewareController = require('../controllers/middlewareController')

auth.post('/login',authController.login)

auth.post('/signup',authController.register)

auth.delete('/signout',middlewareController.authenticateToken, authController.signOut)

auth.get('/users',middlewareController.authenticateToken,authController.getAllUsers)

auth.get('/user/:id',middlewareController.authenticateToken,authController.getUserById)

auth.patch('/user/:id',middlewareController.authenticateToken, authController.updateUserInfo)

auth.delete('/user/:id',middlewareController.authenticateToken,authController.deleteUser)



module.exports = auth