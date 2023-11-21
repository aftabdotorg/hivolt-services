const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const home = async (_, res) => {
  res.status(200).send("welcome to home page");
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "user already exists" });
    }

    /**
     * ! storing hashed password - METHOD 1:
     * * const saltRounds = 10;
     * * const const hashedpass = await bcrypt.hash(password, saltRounds)
     * ? write { pasword : hashedpass } if using above method
     */

    const newUser = await User.create({
      username,
      email,
      phone,
      password,
    });
    res.status(201).json({
      userID: newUser._id.toString(),
      message: "user created",
      token: await newUser.generateToken(),
      created: true,
    });
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }

    /**
     * ! instance methods defined in userModel:
     * ? generateToken()
     * ? validatePass()
     */

    // ? validating password METHOD 1:
    // const isPassValid = await bcrypt.compare(password, userExists.password);

    // ? validating password using instance method METHOD 2:
    const isPassValid = await userExists.validatePassword(password);

    if (isPassValid) {
      return res.status(200).json({
        message: "login successful",
        userID: userExists._id.toString(),
        token: await userExists.generateToken(),
      });
    } else {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};

module.exports = { register, home, login };
