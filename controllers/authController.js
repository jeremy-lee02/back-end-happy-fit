const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

let refreshTokens = [];

const authController = {

  createAccessTok: (user) => {
  return jwt.sign({
    id: user.id,
    isAdmin: user.admin,
  },
  process.env.SECRET_ACCESS_TOKEN,
  { expiresIn: "15m" }
  )},
    
  createRefreshTok: (user) => {
  return jwt.sign({
    id: user.id,
    isAdmin: user.isAdmin,
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
      const saltHash = await bcrypt.genSalt(10)
      const encryptedPassword = await bcrypt.hash(req.body.password, saltHash)
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: encryptedPassword
      })
      const user = await newUser.save()
      res.status(200).json(user)
    } catch (err) {
      res.json({message:err})
    }
  },

  //LOGIN
login: async (req, res) => {
    try {
      const currentUser = await User.findOne({ username: req.body.username })
      if (!currentUser) {
        res.status(400).json("Wrong username")
      }
      const correctPassword = await bcrypt.compare(
        req.body.password,
        currentUser.password
      );
      if (!correctPassword) {
        res.status(400).json("Wrong password")
      }
      if (currentUser && correctPassword) {
        //Generate access token
        const accessTok = authController.createAccessTok(currentUser)
        //Generate refresh token
        const refreshTok = authController.createRefreshTok(currentUser)
        refreshTokens.push(refreshTok);
        //STORE REFRESH TOKEN IN COOKIE
        res.cookie("refreshToken", refreshTok, {
          httpOnly: true,
          secure:false,
          path: "/",
          sameSite: "strict"
        })
        const { ...others } = currentUser._doc
        res.status(200).json({ ...others, accessTok, refreshTok })
      } 
    } catch (err) {
      res.json({message:err})
    }
  },

//Log out
signOut: async (req, res) => {
    //Clear cookies when user logs out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token)
    res.clearCookie("refreshToken")
    res.status(200).json("Logged out successfully!")
  },
  
//Show all existing accounts
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

  const newUser = User.updateOne({_id:req.params.id},{$set:{
    email: req.body.email,
    password: encryptedNewPassword
}})
  res.json(newUser)
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