const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {

  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: 'Not authenticated.'
    })
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(500).json({
      message: `${err}`
    })
  }
  if (!decodedToken) {
    return res.status(401).json({
      message: 'Not authenticated.'
    })
  }
  let user = await userModel.findOne({ email: decodedToken.email });
  if(user){
    req.userId = user._id
    req.userRole = user.isAdmin
  }
  next();
};

