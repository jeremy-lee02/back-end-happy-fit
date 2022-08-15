const Nutrition = require('../models/Nutrition')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        instruction:req.body.instruction
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
    const updatedNutrition = Nutrition.updateOne({_id:req.params.id},{$set:{
        name:req.body.name,
        description:req.body.description,
        ingredient:req.body.ingredient,
        nutrition:req.body.nutrition,
        instruction:req.body.instruction
    }})
    res.json(updatedNutrition)}
    catch(err){
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





module.exports = nutritionController