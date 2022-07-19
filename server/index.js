const express = require("express");
const bodyParser= require("body-parser");
const cors = require("cors");
const mogoose = require("mongoose");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");

//impoerting external file
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const tipsRoutes = require('./routes/tips');
const userRoutes = require('./routes/user');
const postListRoutes = require('./routes/postList');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"))

app.use('/api/post',postRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/tips',tipsRoutes);
app.use('/api/user',userRoutes);
app.use('/api/postList',postListRoutes);




app.listen(process.env.SERVER_PORT,()=>{
    console.log("[+] server up and running on port ",process.env.SERVER_PORT)
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log("[+] DB up and ready to serve");
    })  
})
