let color = require("colors")
const express = require("express")
require("dotenv").config()
const app = express()
let jwt = require("jsonwebtoken")
const port = process.env.PORT || 7000
const conncetToDb = require("./database/db")
conncetToDb()
const UserRouter = require("./routes/UserRoutes")
app.use(express.json())
const cors = require("cors")
app.use(cors())
const AdminRouter = require("./routes/AdminRoute")
const morgon = require("morgan")
app.use(morgon("dev"))
const DietRouter = require("./routes/dietRoutes")



app.use("/user",UserRouter)
app.use("/admin",AdminRouter)
app.use("/diettable",DietRouter)


app.listen(port,()=>{
    console.log(`port started at ${port}`.bgCyan.red)
})