const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const  morgan = require('morgan')
dotenv.config()
//middleWares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
//Routes
app.use("/",require("./routes/userroutes"))
const server = app.listen(process.env.PORT,()=>{
    console.log("Backend Up",server.address().port)
})