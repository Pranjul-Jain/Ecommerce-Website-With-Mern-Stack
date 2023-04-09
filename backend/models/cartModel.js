const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true
    },
    productDescription : { 
        type : String,
    },
    productImage : {
        type : String
    },
    productPrice : {
        type : Number,
        required : true
    },
    productFeatures : [
        {
            type : String,
        }
    ],
    productColors : [
        {
            type : String,
        }
    ]
})

module.exports = mongoose.model('carts',cartSchema)