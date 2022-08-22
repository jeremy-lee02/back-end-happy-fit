const mongoose = require('mongoose')

const ScheduleSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    monday:{
        type: [String]
    },
    tuesday:{
        type: [String]
    },
    wednesday:{
        type: [String]
    },
    thursday:{
        type: [String]
    },
    friday:{
        type: [String]
    },
    saturday:{
        type: [String]
    },
    sunday:{
        type: [String]
    },
},
    
    {collection:'schedule'}
)

module.exports = mongoose.model('Schedule',ScheduleSchema)