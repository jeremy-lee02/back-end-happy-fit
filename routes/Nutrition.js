const express = require('express')
const router = express.Router()
require('dotenv').config()
const nutritionController = require('../controllers/nutritionController')
const middlewareController = require('../controllers/middlewareController')
 


router.get('/', nutritionController.showAllFood)


router.get('/:id',nutritionController.showOneFood)


router.post('/', middlewareController.authenticateToken, nutritionController.createFoodRecipe)


router.patch('/:id',middlewareController.authenticateToken, nutritionController.updateFoodRecipe)

router.delete('/:id',middlewareController.authenticateToken, nutritionController.deleteFoodRecipe)

router.get('/filterByName/:name',nutritionController.filterFoodByName)

module.exports = router