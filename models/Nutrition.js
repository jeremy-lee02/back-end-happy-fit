const mongoose = require('mongoose')

const RecipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,   
        required: true
    },
   
    ingredient:{
        type: Array
    },
    calories:{
        type: Number
    },
    instruction:{
        type: String
    }},
    
    {collection:'recipes'}
)

module.exports = mongoose.model('Recipe',RecipeSchema)