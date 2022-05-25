const mongoose = require("mongoose")

const dietSchema = new mongoose.Schema({
    dietName:{
        type:String,
        required:true
    },
    dietData:[]
}) 



const dietmodel = new mongoose.model("dietTable",dietSchema)

module.exports = dietmodel