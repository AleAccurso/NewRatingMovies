const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { name, email, password, language } = req.body;
  try {
    const existUser = await userModel.findOne({ email: email });
    if (existUser) {
      return res.status(409).json({
        message: 'Email already exist, please pick another email!'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new userModel({
      nickname: name,
      email: email,
      password: hashedPassword,
      language: language,
    });
    const result = await user.save();
    res.status(200).json({
      message: "User created",
      user: { id: result._id, email: result.email },
    });
  } catch (err) {
    if (!err.statusCode) {
      return res.status(500).json({
        message: 'Server error.'
      })
    }
    next(err);
  }
};

let loadedUser;
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        message: 'User with this email not found!'
      })
    }
    loadedUser = user;

    const comparePassword = bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({
        message: 'Password does not match!'
      })
    }
    const token = jwt.sign({ email: loadedUser.email }, process.env.JWT_SECRET, {
      expiresIn: "3600s",
    });
    res.status(200).json({ token: token, language: loadedUser.language });
  } catch (err) {
    if (!err.statusCode) {
      return res.status(500).json({
        message: 'Server error.'
      })
    }
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
    if (authHeader) {
      res.status(200).send({msg : 'You have been Logged Out' });
    } else {
      res.status(404).send({msg : 'Nobody to log out.'});
    }
  })
}

exports.getUser = (req, res, next) => {
  if (loadedUser) {
    res.status(200).json({
      user: {
        id: loadedUser._id,
        nickname: loadedUser.nickname,
        email: loadedUser.email,
        isAdmin: loadedUser.isAdmin,
        myFavorites: loadedUser.myFavorites,
        language: loadedUser.language,
        myRates: loadedUser.myRates,
        profilePic: loadedUser.profilePic,
      },
    });
  } else {
    res.status(404).json({
      user: {},
      message: "No user Logged.",
    });
  }
};
