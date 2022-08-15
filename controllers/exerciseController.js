const Exercise = require('../models/Exercise')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const exerciseController = {


showAllExercise: async(req,res)=>{
    try{
    let page = req.query.page
    const limit = 10
    const startIndex = (page - 1)*limit
    const endIndex =page * limit

    const workout =await Exercise.find()
    const exercises = workout.slice(startIndex, endIndex)
    if (!page){
        res.json(workout)
    } else{res.json(exercises)} }
     
    catch(err){
    res.json({message:err})
    }},


showOneExercise: async(req,res)=>{
    try{
        const workout = await Exercise.findById(req.params.id);
        res.json(workout)
    }
    catch(err){
        res.json({message:err})
    }},

createExercise: async(req,res)=>{
    const workout = new Exercise({
        name:req.body.name,
        description: req.body.description,
        tip: req.body.tip,
        difficulty: req.body.difficulty,
        category:req.body.category,
        videoURL:req.body.videoURL
    })
    
    workout.save()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json({message:err})
    })
    },


updateExercise: async(req,res)=>{
    try{
    const updatedExercise = Exercise.updateOne({_id:req.params.id},{$set:{
        name:req.body.name,
        description: req.body.description,
        tip: req.body.tip,
        difficulty: req.body.difficulty,
        videoURL:req.body.videoURL 
    }})
    res.json(updatedExercise)}
    catch(err){
        res.json({message: err})
    }},


deleteExercise: async(req,res)=>{
    try{
        const workout = await Exercise.remove({_id:req.params.id})
        if (workout.acknowledged==true){
            res.send("Success!")
    }}
    catch(err){
        res.json({message:err})
    }},


filterExercisesByName: async(req,res)=>{
    try{
    const workout = await Exercise.find()
    const result =[]
    for (let i = 0; i < workout.length; i++) {
        console.log(workout[i])
        if (workout[i].name.includes(req.params.name)){
            result.push(workout[i])
        }}
    res.json(result)
    }
    catch(err){
        res.json({message:err})
    }},


filterExercisesByCategory: async(req,res)=>{
    try{
    const workout = await Exercise.find()
    const result = []
    for (let i =0; i < workout.length; i++){
        for (let j =0;j<workout[i].category.length;j++){
        if (workout[i].category.includes(req.params.cat)){
            result.push(workout[i])
    }}}
    res.json(result)
}
    catch(err)
    {res.json({message:err})}
    },


filterExercisesByDifficulty: async(req,res)=>{
    try{
    const workout = await Exercise.find({difficulty:req.params.dif})
    res.json(workout)
    }
    catch(err)
    {res.json({message:err})}
    }
}


module.exports = exerciseController