const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

let refreshTokens = [];

const authController = {

createAccessTok: (user) => {
  return jwt.sign({
    id: user.id
  },
  process.env.SECRET_ACCESS_TOKEN,
  { expiresIn: "15m" }
  )},
    
createRefreshTok: (user) => {
  return jwt.sign({
    id: user.id
  },
  process.env.SECRET_REFRESH_TOKEN,
  { expiresIn: "365d" }
  )},



register: async (req, res) => {
    try {
      const users = await User.find()
      for (let i = 0; i<users.length;i++){
      if ( req.body.email == users[i].email){
           return res.send("Email already existed!")
      }
      }
      const saltHash = await bcrypt.genSalt(10)
      const encryptedPassword = await bcrypt.hash(req.body.password, saltHash)
      const newUser = new User({
        email: req.body.email,
        password: encryptedPassword,
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        imageUrl: req.body.imageUrl
      })
      const user = await newUser.save()
      res.json(user)
    } catch (err) {
      res.json({message:err})
    }
  },


login: async (req, res) => {
    try {
      const currentUser = await User.findOne({ email: req.body.email })
      if (!currentUser) {
        res.status(400).json("Invalid email!");
      }
      const correctPassword = await bcrypt.compare(
        req.body.password,
        currentUser.password
      );
      if (!correctPassword) {
        res.status(400).json("Wrong password!")
      }
      if (currentUser && correctPassword) {
        //Generate access token
        const accessTok = authController.createAccessTok(currentUser)
        //Generate refresh token
        const refreshTok = authController.createRefreshTok(currentUser)
        refreshTokens.push(refreshTok);
        //STORE REFRESH TOKEN IN COOKIE
        res.json({ currentUser, accessTok, refreshTok })
      } 
    } catch (err) {
      console.log(err)
      res.json({message:err})
    }
  },


signOut: async (req, res) => {
    //Clear cookies when user logs out
  },
  

getAllUsers: async (req,res)=> {
    try{
      const users =await User.find()
      res.json(users)}
      catch(err){
      res.json({message:err})
      }
  },


getUserById: async (req,res)=> {
    try{
      const user =await User.findById(req.params.id)
      res.json(user)}
      catch(err){
      res.json({message:err})
      }
  },

//Change password/email
updateUserInfo: async(req,res)=>{
  try {
  const user = User.findById(req.params.id)
  if (user)
  {
  
  if(user.email == req.body.email)
  {
  const saltHash = await bcrypt.genSalt(10)
  const encryptedNewPassword = await bcrypt.hash(req.body.password, saltHash)

  const updatedUser = {
    password: encryptedNewPassword,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    imageUrl: req.body.imageUrl
  }
  await User.findByIdAndUpdate(req.params.id, updatedUser, {new:true})
  res.json(updatedUser)}
  else{ res.sendStatus(401)}}
  } catch (err) {
    console.log(err)
    res.json({message:err})
  }
  
  
  },

//Delete account
deleteUser:async(req,res)=>{
  try{
    const deleted = await User.remove({_id:req.params.id})
    if (deleted.acknowledged==true){
        res.status(200).send("Success!")
  }}
  catch(err){
      res.json({message:err})
  }
  }
}

module.exports = authController