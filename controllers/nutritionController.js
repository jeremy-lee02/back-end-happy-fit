const Nutrition = require('../models/Nutrition')

const nutritionController = {


showAllFood: async(req,res)=>{
    try{
    const recipe =await Nutrition.find()
    res.json(recipe)}
    catch(err){
    res.json({message:err})
    }},


showOneFood: async(req,res)=>{
    try{
        const recipe = await Nutrition.findById(req.params.id);
        res.json(recipe)
    }
    catch(err){
        res.json({message:err})
    }},


createFoodRecipe: async(req,res)=>{
    const recipe = new Nutrition({
        name:req.body.name,
        description:req.body.description,
        ingredient:req.body.ingredient,
        nutrition:req.body.nutrition,
        instruction:req.body.instruction,
        imageUrl:req.body.imageUrl
    })
    
    recipe.save()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json({message:err})
    })
    },


updateFoodRecipe: async(req,res)=>{
    try{
    const updatedNutrition = {
        name:req.body.name,
        description:req.body.description,
        ingredient:req.body.ingredient,
        nutrition:req.body.nutrition,
        instruction:req.body.instruction,
        imageUrl: req.body.imageUrl
    }
    await Nutrition.findByIdAndUpdate(req.params.id,updatedNutrition,{new:true})
    res.json(updatedNutrition)}
    catch(err){
        console.log(err)
        res.json({message: err})
    }},


deleteFoodRecipe: async(req,res)=>{
    try{
        const recipe = await Nutrition.remove({_id:req.params.id})
        if (recipe.acknowledged==true){
            res.send("Success!")
    }}
    catch(err){
        res.json({message:err})
    }},


filterFoodByName: async(req,res)=>{
    try{
        const recipe = await Nutrition.find()
        const result =[]
    for (let i = 0; i < recipe.length; i++) {
        console.log(recipe[i])
        if (recipe[i].name.includes(req.params.name)){
            result.push(recipe[i])
        }}
    res.json(result)
    }
    catch(err){
        res.json({message:err})
    }},
}


module.exports = nutritionController