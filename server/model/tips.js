const mongoose = require('mongoose');

const Tips = mongoose.Schema({
    creator:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        require:true
    },
    post:{
        type:mongoose.Schema.ObjectId,
        ref:'Post',
        require:true
    },
    tip:{
        type:String,
        require:true,
        trim:true,

    },
    replays:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Tips'
        }
    ]
    
},{timestamps:true})


module.exports=mongoose.model("tips",Tips);