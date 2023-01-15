const express = require("express")

const pro_user = express.Router()

pro_user.get("/home",(req,res)=>{
    res.send("Welcome to the home page")
})

pro_user.get("/products",(req,res)=>{
    res.send("Welcome to the Product page")
})

pro_user.get("/posts",(req,res)=>{
    res.send("Welcome to the Post page")
})

pro_user.get("/todos",(req,res)=>{
    res.send("Welcome to the Todo page")
})

module.exports = {pro_user}