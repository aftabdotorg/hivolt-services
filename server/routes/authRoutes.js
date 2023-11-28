const express = require("express");
const { register, home, login } = require("../controllers/authController");
const router = express.Router();
const { signupSchema, loginSchema } = require("../validators/authValidator");
const validate = require("../middlewares/validateMiddleware");

router.get("/", home);
router.post("/register", validate(signupSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
