const mongoose=require('mongoose');
const MONGODB_URL=process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL).then(res=>{
    console.log("mongoose connected")
}).catch(err=>{
    console.log("Error....db connection failed")
});