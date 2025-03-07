const mongoose = require("mongoose");

const main = async(req,res) => {
    const uri = process.env.MONGO_URI

    try{
        return mongoose.connect(uri);
    } catch(err) {
        console.log(err)
    }
}

module.exports = main;