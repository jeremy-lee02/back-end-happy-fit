const express = require('express')
const router = express.Router()
const exercise = require('../models/Exercise')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const exerciseController = require('../controllers/exerciseController')
const middlewareController = require('../controllers/middlewareController')

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
//Show all exercises
router.get('/', exerciseController.showAllExercise)

//Show a specific exercise
router.get('/:id',exerciseController.showOneExercise)

  
//Create one exercise
router.post('/', exerciseController.createExercise)


//Update one exercise
router.patch('/:id', middlewareController.authenticate,exerciseController.updateExercise)


//Delete one exercise
router.delete('/:id', middlewareController.authenticate, exerciseController.deleteExercise)


//Filter exercise by name
router.get('/filterByName/:name', exerciseController.filterExercisesByName)


//Filter exercise by category
router.get('/filterByCategory/:cat', exerciseController.filterExercisesByCategory)


//Filter exercise by difficulty
router.get('/filterByDifficulty/:dif', exerciseController.filterExercisesByDifficulty)


module.exports = router