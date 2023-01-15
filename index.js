const express = require("express")
const {connection} = require("./config/db")
const {U_router} = require("./route/user.route")
const {pro_user} = require("./route/pro.route")
const {authenticate} = require("./middleware/product")

const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/users",U_router)
app.use(authenticate)
app.use("/users",pro_user)


app.listen(4321,async ()=>{
    try {
        await connection
        console.log("DB connected");
    } catch (error) {
        console.log("DB connect connecting");
    }
    console.log("Runnign at 4321");
})