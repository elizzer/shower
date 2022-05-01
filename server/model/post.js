const mongoose = require("mongoose");

const Post = mongoose.Schema({
    creator:{
            type:mongoose.Schema.ObjectId,
            ref:'User'
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
            ref:'User'
        }
    ],
    
    hashTags:[
        {
            type:String,
            trim:true
        }
    ]

},{timestamps:true})

module.exports=mongoose.model("Post",Post);