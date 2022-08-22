const Schedule = require('../models/Schedule')

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
    })
    },


updateSchedule: async(req,res)=>{
    try{
    const schedule = Schedule.findById(req.params.id)
    if (req.body.email != schedule.email){
        res.sendStatus(401)
    }
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
    res.json(updatedSchedule)}
    catch(err){
        res.sendStatus(400).json({message: err})
    }},


deleteSchedule: async(req,res)=>{
    try{
    const schedule = Schedule.findById(req.params.id)
    if (req.body.email != schedule.email){
        res.sendStatus(401)
    }
    const data = await Schedule.remove({_id:req.params.id})
    if (data.acknowledged==true){
            res.send("Success!")
    }}
    catch(err){
        res.sendStatus(400).json({message: err})
    }},

}


module.exports = scheduleController