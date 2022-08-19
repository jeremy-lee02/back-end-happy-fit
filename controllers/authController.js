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


requestRefreshTok: async (req, res) => {
    //Take refresh token from user
    const refreshTok = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshTok) return res.status(401).json("Not authenticated")
    if (!refreshTokens.includes(refreshTok)) return res.status(403).json("Invalid Refresh token!")
    jwt.verify(refreshTok, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        res.status(500).json({message:err})
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshTok)
      //create new access token, refresh token and send to user
      const newAccessTok = authController.createAccessTok(user)
      const newRefreshTok = authController.createRefreshTok(user)
      refreshTokens.push(newRefreshTok)
      res.cookie("refreshToken", refreshTok, {
        httpOnly: true,
        secure:false,
        path: "/",
        sameSite: "strict"
      })
      res.status(200).json({
        accessToken: newAccessTok,
        refreshToken: newRefreshTok
      })
  })
},

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
        res.status(200).json({ currentUser, accessTok, refreshTok })
      } 
    } catch (err) {
      res.json({message:err})
    }
  },


signOut: async (req, res) => {
    //Clear cookies when user logs out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token)
    res.clearCookie("refreshToken")
    res.status(200).json("Logged out successfully!")
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

  const saltHash = await bcrypt.genSalt(10)
  const encryptedNewPassword = await bcrypt.hash(req.body.password, saltHash)

  const updatedUser = {
    email: req.body.email,
    password: encryptedNewPassword,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    imageUrl: req.body.imageUrl
  }

  await User.findByIdAndUpdate(req.params.id, updatedUser, {new:true})
  res.json(updatedUser)
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