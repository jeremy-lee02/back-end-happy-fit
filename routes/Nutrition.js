const express = require('express')
const router = express.Router()
require('dotenv').config()
const nutritionController = require('../controllers/nutritionController')
const middlewareController = require('../controllers/middlewareController')
 


router.get('/', nutritionController.showAllFood)


router.get('/:id',nutritionController.showOneFood)


router.post('/', nutritionController.createFoodRecipe)


router.patch('/:id', nutritionController.updateFoodRecipe)

router.delete('/:id', nutritionController.deleteFoodRecipe)

router.get('/filterByName/:name',nutritionController.filterFoodByName)

module.exports = router