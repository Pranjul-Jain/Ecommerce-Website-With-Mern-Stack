const express = require('express')
const { verifyToken } = require("../middlewares/userMiddleware")
const { getAllProducts,userCartProducts,addProductToCart,getUserProducts,removeItemFromCart, getUserCart } = require("../controllers/productController")
const router = express.Router()


router.route("/all").get(getAllProducts)
router.route("/").get(verifyToken,userCartProducts)
router.route("/addtocart").post(verifyToken,addProductToCart)
router.route("/getUserProducts").get(verifyToken,getUserProducts)
router.route("/removeUserItem/:id").delete(verifyToken,removeItemFromCart)
router.route("/getUserCart").get(verifyToken,getUserCart)

module.exports = router