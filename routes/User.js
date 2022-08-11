const express = require('express')
const auth = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()
auth.use(express.json())

const authController = require("../controllers/authController");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
}

auth.post('/login',authController.login)

auth.post('/signup',authController.register)

auth.delete('/signout', authController.signOut)

auth.get('/users',authenticateToken,authController.getAllUsers)

auth.patch('/user/:id',authenticateToken, authController.updateUserInfo)

auth.delete('/user/:id',authenticateToken,authController.deleteUser)



module.exports = auth