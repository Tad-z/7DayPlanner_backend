const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
    try {
      const user = User.find({ username: req.body.username.toLowerCase() }).exec();
      if ((await user).length >= 1) {
        return res.status(409).json({
          message: `username exists already use a different username`,
        });
      } else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          if (err) {
            console.log(err);
          } else {
            const user = new User({
              username: req.body.username.toLowerCase(),
              email: req.body.email,
              password: hash,
            });
            await user.save().then((result) => {
              if (result) {
                res.status(200).json({
                  message: "You have signed up successfully",
                });
              } else {
                console.log("error occured");
                res.status(400).json({
                  message: "An error occured",
                });
              }
            });
          }
        });
      }
    } catch (err) {
      console.log(err.message);
      res.send("error");
    }
  };

exports.logIn = async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username.toLowerCase() }).exec();
      if (!user) {
        return res.status(401).json({
          message: `username or password is incorrect`,
        });
      }
      const username = user.username;
      const result = await bcrypt.compare(req.body.password, user.password)
      if (!result) {
        return res.status(401).json({
          message: `Username or password incorrect`,
        });
      } else if (result) {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({
          username: username,
          message: `Authentication successful`,
          token: token
        });
      }
      return res.status(401).json({
        message: `Username or password incorrect`,
      });
    } catch (err) {
      res.json("error");
      console.log(err.message);
    }
};

exports.getUser = async (req, res) => {
    try {
      let userId = req.userData.id;
      console.log(userId);
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({
          message: "User does not exist",
        });
      }
  
      return res.status(200).json({
        user,
        message: "Found User",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };