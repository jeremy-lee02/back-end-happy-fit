const mongoose = require('mongoose')

const ScheduleSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    monday:{
        type: Array
    },
    tuesday:{
        type: Array
    },
    wednesday:{
        type: Array
    },
    thursday:{
        type: Array
    },
    friday:{
        type: Array
    },
    saturday:{
        type: Array
    },
    sunday:{
        type: Array
    },
},
    
    {collection:'schedule'}
)

module.exports = mongoose.model('Schedule',ScheduleSchema)