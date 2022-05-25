const dietmodel = require("../modal/DietModal")



const addNewDiet = async (req,res) => {
    try{
        let insertNewDiet = await dietmodel(req.body)
        let result = await insertNewDiet.save()
        res.status(200).json({message:"SuccessFully Added New Diet",result})
    }catch(error){
        res.json({message:"Unable To Add Product"})
    }
}



const displayAllDiet = async (req,res) => {
    try{
        let allDatas = await dietmodel.find({})
        res.status(200).json({message:"SuccessFully Retrieved The Data",result:allDatas}) 
    }catch(error){
        res.json({message:"Unable to display the data"})
    }
}



const singleDietPlan = async (req,res) => {
    try{
        let singleData = await dietmodel.findById({_id:req.params.id})
        res.status(200).json({message:"SuccessFully Retreived The Data",result:singleData})
    }catch(error){
        res.json({message:"Unable To display The Data"})
    }
}



const updateSingleDiet = async (req,res) => {
    try{
        let updateData = await dietmodel.updateOne({_id:req.params.id},{$set:req.body})
        res.status(200).json({message:"Updateed SuccessFully",result:updateData})
    }catch(error){
        res.json({message:"unable To Update The data"})
    }
}



const deleteSingleDiet = async (req,res) => {
    try{
        let deletedietPlan = await dietmodel.deleteOne({_id:req.params.id})
        res.status(200).json({message:"Deleted SuccessFully",result:deletedietPlan})
    }catch(error){
        res.json({message:"Unable To Delete The Diet Plan"})
    }
} 



module.exports = {addNewDiet, displayAllDiet, singleDietPlan, updateSingleDiet, deleteSingleDiet}