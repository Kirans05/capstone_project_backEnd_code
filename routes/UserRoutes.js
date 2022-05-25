const express = require("express")
const {UserProtect, protect} = require("../Authorization/Auhorization")
const router = express.Router()
const { userSignUp, loginUser, userPurchased, AddToCart, fetchCartItem, removeFromCart, ordrePizza, myOrders, fetchParticularUser, addCalories, addNewDietPlan, getSingleUserDetails, removeDeitPlan } = require("../controllers/Usercontrollers")


router.route("/").post(userSignUp)
router.route("/login").post(loginUser)
router.route("/updateCalories").post(protect,addCalories)
router.route("/newDietPlan").put(protect,addNewDietPlan)
router.route("/displayUserData").get(protect,getSingleUserDetails)
router.route("/removeDietPlan").put(protect,removeDeitPlan)


module.exports = router