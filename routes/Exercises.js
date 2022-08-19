const express = require('express')
const router = express.Router()
const exercise = require('../models/Exercise')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const exerciseController = require('../controllers/exerciseController')
const middlewareController = require('../controllers/middlewareController')


//Show all exercises
router.get('/', exerciseController.showAllExercise)

//Show a specific exercise
router.get('/:id',exerciseController.showOneExercise)

  
//Create one exercise
router.post('/', middlewareController.authenticateToken, exerciseController.createExercise)


//Update one exercise
router.patch('/:id',middlewareController.authenticateToken, exerciseController.updateExercise)


//Delete one exercise
router.delete('/:id', middlewareController.authenticateToken, exerciseController.deleteExercise)


//Filter exercise by name
router.get('/filterByName/:name', exerciseController.filterExercisesByName)


//Filter exercise by category
router.get('/filterByCategory/:cat', exerciseController.filterExercisesByCategory)


//Filter exercise by difficulty
router.get('/filterByDifficulty/:dif', exerciseController.filterExercisesByDifficulty)


module.exports = router