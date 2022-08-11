const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
   username:{
        type: String,
        required: true,
        unique: true
   },
   password:{
        type: String,
        required: true,
   },
   email:{
     type:String,
     required: true,
     unique: true
   },
   isAdmin:{
     type: Boolean,
     default: false,
   }
},
   
{collection: 'users'}
)

module.exports = mongoose.model('User',UserSchema)