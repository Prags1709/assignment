const express = require("express")
const {UserModel} = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const U_router = express.Router()

U_router.post("/reg",async (req,res)=>{
    let {name,email,pass,age} = req.body
    try {
        bcrypt.hash(pass, 3,async (err,secret_pass)=>{
           if(err){
                 console.log(err);
           }else{
                const user = new UserModel({name,email,pass:secret_pass,age})
                await user.save()
                res.send("Regiser user data")
           }
        })
    } catch (error) {
        console.log(error);
        res.send({"err":"Something went wrong"})
    }
})

U_router.post("/login",async (req,res)=>{
    const {email,pass} = req.body
    try {
        const user = await UserModel.find({email})
        const hash_pass = user[0].pass
        if(user.length>0){
            bcrypt.compare(pass, hash_pass, (err,result)=>{
                if(result){
                    const token = jwt.sign({ UserID:user[0]._id }, "unlock", { expiresIn: '1h' })
                    //console.log(token);
                    res.send({"message":"Login successfully","token":token})    
                }else{
                    res.send("Wrong credential")
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.send({"err":"Something went wrong"})
    }
})

module.exports = {U_router}