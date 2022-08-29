const Exercise = require('../models/Exercise')
const Schedule = require('../models/Schedule')
const User = require('../models/User')

const scheduleController = {


showAllSchedules: async(req,res)=>{
    try{
        const schedules = Schedule.find()
        res.json(schedules)
    }
     
    catch(err){
    console.log(err)
    res.sendStatus(400).json({message: err})
}},


getScheduleByEmail: async(req,res)=>{
    try{
        const schedules= await Schedule.find({email: req.body.email})
        const schedule = schedules[0]
        res.json(schedule)
    }
    catch(err){
        res.sendStatus(400).json({message: err})
}},

createSchedule: async(req,res)=>{
    
    const schedule = new Schedule({
        email: req.body.email,
        monday: req.body.monday,
        tuesday: req.body.tuesday,
        wednesday: req.body.wednesday,
        thursday: req.body.thursday,
        friday: req.body.friday,
        saturday: req.body.saturday,
        sunday: req.body.sunday
    })
    
    schedule.save()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.sendStatus(400).json({message: err})
})},


updateSchedule: async(req,res)=>{
    try{
    const schedule = Schedule.findById(req.params.id)
    if (req.body.email != schedule.email){res.sendStatus(401)} else {
    const updatedSchedule = {
        monday: req.body.monday,
        tuesday: req.body.tuesday,
        wednesday: req.body.wednesday,
        thursday: req.body.thursday,
        friday: req.body.friday,
        saturday: req.body.saturday,
        sunday: req.body.sunday
    }
    await Schedule.findByIdAndUpdate(req.params.id,updatedSchedule,{new:true})
    res.json(updatedSchedule)
    }}
    catch(err){
        res.sendStatus(400).json({message: err})
}},


addExercise: async(req,res)=>{
    try {
        
        const user = await User.findById(req.params.userId)
        let userSchedule = await Schedule.findById(req.params.scheduleId)
        if (user.email != userSchedule.email){
            return res.sendStatus(401)}
        const addedExercise = await Exercise.findById(req.body.id)
        const day = req.body.day
        switch (day){
            case 'Monday':
            userSchedule.monday.push(addedExercise);
            break;
            case 'Tuesday':
            userSchedule.tuesday.push(addedExercise);
            break;
            case 'Wednesday':
            userSchedule.wednesday.push(addedExercise);
            break;
            case 'Thursday':
            userSchedule.thursday.push(addedExercise);
            break;
            case 'Friday':
            userSchedule.friday.push(addedExercise);
            break;
            case 'Saturday':
            userSchedule.saturday.push(addedExercise);
            break;
            case 'Sunday':
            userSchedule.sunday.push(addedExercise);
            break;
        }
        await Schedule.findByIdAndUpdate(userSchedule._id, userSchedule, {new:true})
        res.json(userSchedule)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
},

deleteSchedule: async(req,res)=>{
    try{
    const user = await User.findById(req.params.userId)
    let userSchedule = await Schedule.findById(req.params.scheduleId)
    if (user.email != userSchedule.email){
        return res.sendStatus(401)}
         
    const removedExercise = await Exercise.findById(req.body.id)
    const day = req.body.day
    let exerciseIndex = 0;
    switch (day){
        case 'Monday':
            exerciseIndex = userSchedule.monday.findIndex(object => {
                return object == removedExercise;
              })
            userSchedule.monday.splice(exerciseIndex,1);
            break;
        case 'Tuesday':
            exerciseIndex = userSchedule.tuesday.findIndex(object => {
                return object == removedExercise;
              });
            userSchedule.tuesday.splice(exerciseIndex,1);
            break;
        case 'Wednesday':
            exerciseIndex = userSchedule.wednesday.findIndex(object => {
                return object == removedExercise;
              });
            userSchedule.wednesday.splice(exerciseIndex,1);
            break;
        case 'Thursday':
            exerciseIndex = userSchedule.thursday.findIndex(object => {
                return object == removedExercise;
              });
            userSchedule.thursday.splice(exerciseIndex,1);
            break;
        case 'Friday':
            exerciseIndex = userSchedule.friday.findIndex(object => {
                return object == removedExercise;
              });
            userSchedule.friday.splice(exerciseIndex,1);
            break;
        case 'Saturday':
            exerciseIndex = userSchedule.saturday.findIndex(object => {
                return object == removedExercise;
              });
            userSchedule.saturday.splice(exerciseIndex,1);
            break;
        case 'Sunday':
            exerciseIndex = userSchedule.sunday.findIndex(object => {
                return object == removedExercise;
              });
            userSchedule.sunday.splice(exerciseIndex,1);
            break;
    }
    await Schedule.findByIdAndUpdate(userSchedule._id, userSchedule, {new:true})
    res.json(userSchedule)}
    catch(err){
        console.log(err)
        res.sendStatus(400)
}},

}


module.exports = scheduleController