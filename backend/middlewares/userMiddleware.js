const jwt = require("jsonwebtoken")

const protect = (req,res,next)=>{
    if(req.headers.authorization.startsWith("Bearer")){
        const token = req.headers.authorization.split(" ")[1]
        try{
            jwt.verify(token,process.env.JWT_SECRET)
        }
        catch(error){
            return res.status(404).json({
                status : "Token is invalid"
            })
        }

        const data = jwt.verify(token,process.env.JWT_SECRET)
        if(!data.id || !data.email){
            return res.status(403).json({
                status : "Token expires"
            })
        }
        else{
            next()
        }

    }else{
        return res.status(401).json({
            status : "user is unauthorized"
        })
    }
}

const verifyToken = (req,res,next)=>{

    if(req.headers.authorization.startsWith("Bearer")){
        const token = req.headers.authorization.split(" ")[1]
        
        try{
            jwt.verify(token,process.env.JWT_SECRET)
        }
        catch(error){
            return res.status(404).json({
                status : "Token is invalid"
            })
        }

        const data = jwt.verify(token,process.env.JWT_SECRET)
        res.setHeader("id",data.id)
        next()

    }else{
        return res.status(403).json({
            status : "user is unauthorized"
        })
    }
}

module.exports = {
    protect,
    verifyToken,
};