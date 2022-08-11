const jwt = require("jsonwebtoken");

//Verify the token
const tokenAuthenticate=(req, res, next)=> {
    const tok = req.headers.token;
    if (tok) {
        const accessTok = token.split(" ")[1];
        jwt.verify(accessTok, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
        if (err) {
            res.status(403).json("Token is not valid!");
        }
        req.user = user;
        next();
        });
    } else {
        res.status(401).json("You're not authenticated");
    }
}
  
//Verify the users
const authenticate = (req, res, next) => {
    authenticateToken(req, res, () => {
      if (req.user.id === req.params.id) {
        next()
      } else {
        res.status(403).json("Unauthenticated!");
      }
    })
  }

//Verify the admins
const adminAuthenticate = (req, res, next) => {
    authenticateToken(req, res, () => {
      if (req.user.isAdmin) {
        next()
      } else {
        res.status(403).json("Unauthenticated!");
      }
    })
  }

module.exports = {
    tokenAuthenticate,
    authenticate,
    adminAuthenticate
}
  