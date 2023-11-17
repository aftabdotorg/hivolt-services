const User = require("../models/userModel");

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

module.exports = { register, home };
