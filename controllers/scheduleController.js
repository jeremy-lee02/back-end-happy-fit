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


showOneSchedule: async(req,res)=>{
    try{
        const schedule = await Schedule.findById(req.params.id);
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
        console.log(day)
        console.log(userSchedule.monday)
        switch (day){
            case 'Monday':
            userSchedule.monday.push(addedExercise);
            case 'Tuesday':
            userSchedule.tuesday.push(addedExercise);
            case 'Wednesday':
            userSchedule.wednesday.push(addedExercise);
            case 'Thursday':
            userSchedule.thursday.push(addedExercise);
            case 'Friday':
            userSchedule.friday.push(addedExercise);
            case 'Saturday':
            userSchedule.saturday.push(addedExercise);
            case 'Sunday':
            userSchedule.sunday.push(addedExercise);
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
    const schedule = Schedule.findById(req.params.id)
    if (req.body.email != schedule.email){
        return res.sendStatus(401)}
    else {
    const data = await Schedule.remove({_id:req.params.id})
    if (data.acknowledged==true){
            res.send("Item removed!")
    }}}
    catch(err){
        res.sendStatus(400).json({message: err})
}},

}


module.exports = scheduleController