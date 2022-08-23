const Exercise = require('../models/Exercise')

const exerciseController = {


showAllExercise: async(req,res)=>{
    try{
    const result =[]
    const workout = await Exercise.find()
    
    let page = req.query.page
    let value = req.query.value
    if (!page && !value){
        res.json(workout)
    } 

    const limit = 10
    const startIndex = (page - 1)*limit
    const endIndex = page * limit
    let exercises = workout.slice(startIndex, endIndex)
    console.log(endIndex)
    if (req.query.value){
    for (let i = 0; i < workout.length; i++) {
        if (workout[i].name.includes(req.query.value)){
            result.push(workout[i])
        }}
        exercises = result.slice(startIndex, endIndex)
        res.json(exercises)
    } else {res.json(exercises)}
     }
     
    catch(err){
    console.log(err)
    res.sendStatus(400)
    }},


showOneExercise: async(req,res)=>{
    try{
        const workout = await Exercise.findById(req.params.id);
        res.json(workout)
    }
    catch(err){
        res.json({message:err})
    }},


getExerciseByName: async(req,res)=>{
    try{
        const exercise = await Exercise.find({name: req.body.name});
        res.json(exercise)
    }
    catch(err){
        res.json({message:err})
    }},


createExercise: async(req,res)=>{
    
    const exercises = await Exercise.find()
      for (let i = 0; i< exercises.length;i++){
      if ( req.body.name == exercises[i].name){
           return res.send("Exercise name already existed!")
      }
      }

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
    
    const updatedExercise = {
        name:req.body.name,
        description: req.body.description,
        difficulty: req.body.difficulty,
        tip: req.body.tip,
        videoURL:req.body.videoURL 
    }
    await Exercise.findByIdAndUpdate(req.params.id,updatedExercise,{new:true})
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
        if (workout[i].name.includes(req.params.name)){
            result.push(workout[i])
        }}
    let page = req.query.page
    const limit = 10
    const startIndex = (page - 1)*limit
    const endIndex =page * limit
    const exercises = result.slice(startIndex, endIndex)
    if (!page){
        res.json(result)
    } else { res.json(exercises)}
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