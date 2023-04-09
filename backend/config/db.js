const mongoose = require('mongoose')

const ConnectDB = async ()=>{

    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log("MONGODB Database connected on "+conn.connection.port)
    }catch(err){
        console.log("MONGODB Database is not connected")
        process.exit();
    }
}

module.exports = ConnectDB;