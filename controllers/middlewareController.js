const jwt = require("jsonwebtoken");

//Verify the token
const authenticateToken = async (req, res, next) => {
  try {
    if(!req.headers.authorization){
      return res.sendStatus(401)
    }
  const token = req.headers.authorization.split(" ")[1] 
  let decodedData;
  if (token){
    decodedData = jwt.verify(token,process.env.SECRET_ACCESS_TOKEN);
    next()
  }
  } catch (error) {
    console.log(error)
    res.json({message: error})
  }}
  
//Verify the users

module.exports = {
  authenticateToken
}
  