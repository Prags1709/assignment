const jwt =require("jsonwebtoken")

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        const decoded = jwt.verify(token,"unlock")
        if(decoded){
            console.log(decoded)
            next()
        }else{
            res.send("Login first")
        }
    }else{
        res.send("Login first")
    }
}

module.exports = {authenticate}