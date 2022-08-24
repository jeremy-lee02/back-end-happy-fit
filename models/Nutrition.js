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
    nutrition: {
        type: String
    },
    instruction:{
        type: String
    },
    imageUrl:{
        type: String
    }},
    {collection:'recipes'}
)

module.exports = mongoose.model('Recipe',RecipeSchema)