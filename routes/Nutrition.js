const express = require('express')
const router = express.Router()
const nutrition = require('../models/Nutrition')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const nutritionController = require('../controllers/nutritionController')

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
  


router.get('/', nutritionController.showAllFood)


router.get('/:id',nutritionController.showOneFood)


router.post('/',nutritionController.createFoodRecipe)


router.patch('/:id',authenticateToken, nutritionController.updateFoodRecipe)


router.delete('/:id',authenticateToken, nutritionController.deleteFoodRecipe)


router.get('/filterByName/:name',nutritionController.filterFoodByName)

module.exports = router