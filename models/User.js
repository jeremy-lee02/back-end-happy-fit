const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  email:{
    type:String,
    required: true
   },
   password:{
    type: String,
    required: true,
   },
   firstname:{
    type: String,
    required: true
   },
   lastname: {
    type: String,
    required: true
   },
   imageUrl:{
    type: String
   },
   isAdmin:{
    type: Boolean,
    default: false
   }
},
   
{collection: 'users'}
)

module.exports = mongoose.model('User',UserSchema)