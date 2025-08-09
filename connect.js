const mongoose=require("mongoose");

async function connecToMongoDb(url){
    return mongoose.connect(url);
}

module.exports=
{connecToMongoDb};