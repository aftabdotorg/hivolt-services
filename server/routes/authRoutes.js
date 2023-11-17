const express = require("express");
const { register, home } = require("../controllers/authController");
const router = express.Router();

router.get("/", home);
router.post("/register", register);

module.exports = router;
