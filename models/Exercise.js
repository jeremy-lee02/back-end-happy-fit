const mongoose = require('mongoose')

const ExerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    difficulty: {
        type: Number,
        required: true
    },
    category: Array,
    tip: String,
    videoURL: {
        type: String
    }},
    {collection:'exercises'}
)

module.exports = mongoose.model('Exercise',ExerciseSchema)