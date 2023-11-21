const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ! storing hashed password - METHOD 2:

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPass;
  } catch (error) {
    next(error);
  }
});

// ! validating password - METHOD 2:
userSchema.methods.validatePassword = async function (password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error);
  }
};

// ! generating token
userSchema.methods.generateToken = async () => {
  try {
    return jwt.sign(
      {
        userID: this._id,
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
