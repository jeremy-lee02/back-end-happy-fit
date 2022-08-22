const express = require('express')
const router = express.Router()
require('dotenv').config()
const scheduleController = require('../controllers/scheduleController')
const middlewareController = require('../controllers/middlewareController')


//Show all exercises
router.get('/', scheduleController.showAllSchedules)

//Show a specific exercise
router.get('/:id',scheduleController.showOneSchedule)

  
//Create one exercise
router.post('/', middlewareController.authenticateToken, scheduleController.createSchedule)


//Update one exercise
router.patch('/:id',middlewareController.authenticateToken, scheduleController.updateSchedule)


//Delete one exercise
router.delete('/:id', middlewareController.authenticateToken, scheduleController.deleteSchedule)


module.exports = router