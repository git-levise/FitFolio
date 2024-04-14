const express = require("express");
const router = express.Router();
const {currenttUser,loginUser,registerUser} = require("../controllers/userController")

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(currenttUser);

module.exports = router;