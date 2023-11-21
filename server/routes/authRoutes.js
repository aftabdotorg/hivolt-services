const express = require("express");
const { register, home, login } = require("../controllers/authController");
const router = express.Router();
const signupSchema = require("../validators/authValidator");
const validate = require("../middlewares/validateMiddleware");

router.get("/", home);
router.post("/register", validate(signupSchema), register);
router.post("/login", login);

module.exports = router;
