const express  = require("express")
const { protect } = require("../Authorization/Auhorization")
const { addNewDiet, displayAllDiet, singleDietPlan, updateSingleDiet, deleteSingleDiet } = require("../controllers/dietController")

const router = express.Router()


router.route("/").post(protect,addNewDiet)
router.route("/allDatas").get(protect,displayAllDiet)
router.route("/singleData/:id").get(protect,singleDietPlan)
router.route("/updateDiet/:id").post(protect,updateSingleDiet)
router.route("/delete/:id").delete(protect,deleteSingleDiet)



module.exports = router