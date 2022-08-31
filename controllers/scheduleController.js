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
        //Find the user account
        const user = await User.findById(req.params.userId)
        if (!user){
            return res.sendStatus(404)
        }

        //Find the user work out schedule
        let userSchedule = await Schedule.findById(req.params.scheduleId)
        if (!userSchedule){
            return res.sendStatus(404)
        }

        //Verify if the user and the schedule match
        if (user.email != userSchedule.email){
            return res.sendStatus(401)}

        //Find the exercise that user want to add
        const addedExercise = await Exercise.findById(req.body.id)
        if (!addedExercise){
            return res.sendStatus(404)
        }

        //Get the day value to add the exercise to
        const day = req.body.day
        const exercisenName = addedExercise.name
        
        //Add the exercise to the desired day
        switch (day){
            case 'Monday':
            for (let i=0;i<userSchedule.monday.length;i++){
                if (userSchedule.monday[i].name == exercisenName){
                    return res.sendStatus(403)
                }}
            userSchedule.monday.push(addedExercise);
            break;
            case 'Tuesday':
                for (let i=0;i<userSchedule.tuesday.length;i++){
                if (userSchedule.tuesday[i].name == exercisenName){
                    return res.sendStatus(403)
                }}
                
            userSchedule.tuesday.push(addedExercise);
            break;
            case 'Wednesday':
                for (let i=0;i<userSchedule.wednesday.length;i++){
                if (userSchedule.wednesday[i].name == exercisenName){
                    return res.sendStatus(403)
                }}
            userSchedule.wednesday.push(addedExercise);
            break;
            case 'Thursday':
                for (let i=0;i<userSchedule.thursday.length;i++){
                if (userSchedule.thursday[i].name == exercisenName){
                    return res.sendStatus(403)
                }}
            userSchedule.thursday.push(addedExercise);
            break;
            case 'Friday':
                for (let i=0;i<userSchedule.friday.length;i++){
                if (userSchedule.friday[i].name == exercisenName){
                    return res.sendStatus(403)
                }}
            userSchedule.friday.push(addedExercise);
            break;
            case 'Saturday':
                for (let i=0;i<userSchedule.saturday.length;i++){
                if (userSchedule.saturday[i].name == exercisenName){
                    return res.sendStatus(403)
                }}
            userSchedule.saturday.push(addedExercise);
            break;
            case 'Sunday':
                for (let i=0;i<userSchedule.sunday.length;i++){
                if (userSchedule.sunday[i].name == exercisenName){
                    return res.sendStatus(403)
                }}
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
                return (object.name == removedExercise.name)
              })

            if (exerciseIndex < 0){break;}
              
            userSchedule.monday.splice(exerciseIndex,1);
            break;
        case 'Tuesday':
            exerciseIndex = userSchedule.tuesday.findIndex(object => {
                return (object.name == removedExercise.name)
              })

            if (exerciseIndex < 0){break;}

            userSchedule.tuesday.splice(exerciseIndex,1);
            break;
        case 'Wednesday':
            exerciseIndex = userSchedule.wednesday.findIndex(object => {
                return (object.name == removedExercise.name)
              })
              
            if (exerciseIndex < 0){break;}

            userSchedule.wednesday.splice(exerciseIndex,1);

            break;
        case 'Thursday':
            exerciseIndex = userSchedule.thursday.findIndex(object => {
                return (object.name == removedExercise.name)
              })

            if (exerciseIndex < 0){break;}

            userSchedule.thursday.splice(exerciseIndex,1);

            break;
        case 'Friday':
            exerciseIndex = userSchedule.friday.findIndex(object => {
                return (object.name == removedExercise.name)
              })

            if (exerciseIndex < 0){break;}

            userSchedule.friday.splice(exerciseIndex,1);
            break;
        case 'Saturday':
            exerciseIndex = userSchedule.saturday.findIndex(object => {
                return (object.name == removedExercise.name)
              })
            
            if (exerciseIndex < 0){break;}

            userSchedule.saturday.splice(exerciseIndex,1);
            break;
        case 'Sunday':
            exerciseIndex = userSchedule.sunday.findIndex(object => {
                console.log("Object ", object, "Data ", removedExercise)
                return (object.name == removedExercise.name)
                
              })

            if (exerciseIndex < 0){break;}

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