const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/user')
const Token = require('../model/token')
const Joi = require("joi");
const crypto = require("crypto");
const { resetpassword_sendEmail } = require('./mail')

exports.change_password_request = async (req, res) => {
  const {kongu_email}=req.body
  console.log(req.body)
  try {
    // const schema = Joi.object({ kongu_email: Joi.string().email().required() });
    // const { error } = schema.validate(req.body);
    // if (error) return res.status(400).json(error.details[0].message);
    const user = await User.findOne({ kongu_email });
    if (!user)
      return res.status(400).json("User With Given Email Doesn't Exist");
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const link = `http://localhost:3000/forgotten-password/${user._id}/${token.token}`;
    await resetpassword_sendEmail(user.kongu_email, "Your Password reset request is accepted", link);
    res.status(200).json("Password Reset Link Sent To Your Email Account");

  } catch (error) {
    console.log(error);
    res.status(500).json(error)
    
  }

}


exports.change_password = async (req, res) => {
  if (req.body.password === req.body.confirm_password) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) return res.status(400).json("Invalid Link")
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res.status(400).json("Invalid Link");
      if (!user.verified) user.verified = true;

      const hashPassword = await bcrypt.hash(req.body.password, 12);
      user.password = hashPassword;
      await user.save();
      await token.remove();
      res.status(200).json("Password Reset successfully");
    } catch (error) {
      console.log(error.message)
      res.status(500).json("Internal Server Error");
    }
  }
  else {
     console.log()
    res.status(500).json("Password and confirm Password Not Match!");
  }

}
