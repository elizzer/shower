const mongoose = require("mongoose");

const Post = mongoose.Schema({
    creator:{
            type:mongoose.Schema.ObjectId,
            ref:'users'
        },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        required:true
    },
    like:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'users'
        }
    ],
    tips:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'tips'
        }
    ],
    hashTags:[
        {
            type:String,
            trim:true
        }
    ]

},{timestamps:true})

module.exports=mongoose.model("post",Post);