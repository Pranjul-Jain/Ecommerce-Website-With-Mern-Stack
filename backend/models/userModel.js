const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true,
    },
    
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique: true,
    },
    
    password : {
        type : String,
        required : true,
    },

    cart : [
        {
            productID : {
                type: mongoose.Schema.Types.ObjectId,
                auto : true
            },
            quantity : {
                type : Number,
            },
        }
    ]
})

userSchema.method.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre('save',async function (next){
    if(!this.isModified){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

module.exports = mongoose.model("users",userSchema)