const express = require("express")

const {
    UserRegister,
    UserLogin,
    UserLogout
} = require("../controllers/userController")

const {
    verifyToken
} = require("../middlewares/userMiddleware")

const router = express.Router();

router.route("/login").post(UserLogin)
router.route("/register").post(UserRegister)
router.route("/logout").delete(verifyToken,UserLogout)


module.exports = router