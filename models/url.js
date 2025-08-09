const mongoose = require('mongoose');

const urlschema=new mongoose.Schema({
    ShortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    }, 
    visitHistory:[{
        timestamps:{
            type:Number
        }
    }
],},{
    timestamps:true
});

const URL=mongoose.model('URL',urlschema);

module.exports=URL;