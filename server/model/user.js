const mongoose = require("mongoose");

const User = mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        min:[3,"needed minimum of three character"],
        max:[10,"User name must not be more than 10 character"]
    },
    dob:{
        type:Date,
        require:true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    hashedPassword:{
        type:String,
        require:true
    },
    bio:{
        type:String
    },
    profilePicture:{
        type:String,
        default:'',
    },
    followers:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'users'
        }
    ],
    following:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'users'
        }
    ],
    post:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"post"
        }
    ],

})



module.exports=mongoose.model('User',User);