const mongoose = require("mongoose")
const cartModel = require("../models/cartModel")
const userModel = require("../models/userModel")

const asynchandler = require("express-async-handler")


const getAllProducts = asynchandler(async (req,res)=>{
    const products = await cartModel.find({})
    
    if ( products ){
        return res.status(200).json({
            products : products
        })
    }else{
        return res.status(404).json({
            status : "Not Found"
        })
    }
})

const userCartProducts = asynchandler(async(req,res)=>{
    const user = await userModel.findOne({id:new mongoose.Types.ObjectId(res.getHeader("id"))},{cart:1})
    cartIds = user.map(cartItem=>cartItem.productID)

    const products = await cartModel.find({_id:{ $in : cartIds}})

    if(products){
        return res.status(200).json({
            products : products
        })
    }else{
        return res.status(404).json({
            status : "Not Found"
        })
    }

})

const addProductToCart = asynchandler(async (req,res)=>{
    try{
        const cartItem = {
            productID : req.body.id,
            quantity : parseInt(req.body.quantity)
        }


        const user = await userModel.findOne({_id:new mongoose.Types.ObjectId(res.getHeader('id'))})

        const response = await user.updateOne({
            $push : {cart : cartItem}
        })

        if(response.acknowledged){
            res.status(200).json({
                status : "succesfully added"
            })
        }else{
            res.status(500).json({
                status : "failed to add"
            })
        }

    }catch(error){
        console.log(error.message)
        console.log(error)
        return res.status(500).json({
            status : "Item is not added"
        })
    }
})

const getUserProducts = asynchandler(async (req,res)=>{
    const user = await userModel.findOne({_id:new mongoose.Types.ObjectId(res.getHeader("id"))},{cart:{productID:1,quantity:1}})


    const productQuantity = new Array();
    const cartIDs = user.cart.map((item)=>{
        if(item.quantity && item.quantity>0)
        productQuantity.push(item.quantity)
        return item.productID
    })

    const products = await cartModel.find({_id:
        { $in : cartIDs }
    })


    return res.status(200).json({
        products,
        productQuantity
    })

})

const removeItemFromCart = asynchandler(async (req,res)=>{
    try{

        const user = await userModel.findOne(
            {
                _id : res.getHeader("id")
            }
        )

        await user.updateOne({
                $pull :{
                    cart : {productID : req.params.id}
                }
        })


        return res.status(200).json({
            status : "object removed"
        })
    }catch(error){
        return res.status(500).json({
            status : "Server Error"
        })
    }
})

const getUserCart = asynchandler(async (req,res)=>{
    const user = await userModel.findOne({_id:new mongoose.Types.ObjectId(res.getHeader("id"))},{cart:{productID:1}})


    return res.status(200).json({
      cart : user.cart
    })
})

module.exports = {
    getAllProducts,
    userCartProducts,
    addProductToCart,
    getUserProducts,
    removeItemFromCart,
    getUserCart
}