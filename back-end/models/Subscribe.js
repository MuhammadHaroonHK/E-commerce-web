const mongoose=require('mongoose')

const subscribeSchema= new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },

    subscribeAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model("Subscribers", subscribeSchema);