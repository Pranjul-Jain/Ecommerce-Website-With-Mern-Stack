const asynchandler = require('express-async-handler')
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose")
const generateToken = require('../config/generateToken')

const UserRegister = asynchandler(async (req,res)=>{

    try{

        const { name , email , password  } = req.body
        
        if(!name && !email && !password){
            return res.status(400).json({
                status : "Please fill all the fields"
            })
        }
        
        const schema = {
            name : name,
            email : email,
            password : password,
            cart : [
                {
                    productID : new mongoose.Types.ObjectId,
                    quantity : 0
                }
            ]
        }

        let user = await userModel.findOne({
            email:email
        })

        if(!user){
            
            user = await userModel.create(schema)

            return res.status(200).json({
                status : "user created succesfully"
            })

        }
        else{
            return res.status(201).json({
                status : "user already exists"
            })
        }
    }catch(error){
        console.log(error)
        return res.status(400).json({
            status : "Client Side Error"
    })
    }
})

const UserLogin = asynchandler(async (req,res)=>{
    const { email , password } = req.body // object destructive assigmet
    
    const user = await userModel.findOne({ email }) 

    if(user && (await bcrypt.compare(password,user.password))){
        return res.status(200).json({
            name : user.name,
            token : generateToken(user._id,user.email)
        })
    }
    else{
        return res.status(401).json({
            status : "User is not authorized"
        })
    }
})

const UserLogout = asynchandler(async (req,res)=>{
    
    if(res.getHeader("id")){
        return res.status(200).json({
            status : "Ok"
        })
    }
    else{
        return res.status(500).json({
            status : "server error"
        })
    }

})

module.exports = {
    UserRegister,
    UserLogin,
    UserLogout
}