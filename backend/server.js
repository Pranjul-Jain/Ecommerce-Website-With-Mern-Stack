const express = require('express')
const bodyParser = require("body-parser")
const ConnectDB = require("./config/db")
const dotenv = require('dotenv')
const cors = require('cors')
const app = express();

var corsOptions = {
    origin : ["http://localhost:5173"],
    optionsSuccessStatus: 200
}

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors(corsOptions))

dotenv.config()
ConnectDB()

const UserRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")

app.get("/",(req,res)=>{
    res.send("Hello How r'y")
})

app.use("/user",UserRoutes)
app.use("/products",productRoutes)

app.listen(process.env.PORT,()=>{
    console.log("Server Started")
})

