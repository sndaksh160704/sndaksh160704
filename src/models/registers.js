const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const async = require("hbs/lib/async");
const jwt=require("jsonwebtoken")
const empSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },

    lastname:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})
 empSchema.methods.generateAuthToken=async function(){
    try{
      const token=jwt.sign({_id:this._id.toString()},"sdgfsdfhgafhfhfdhfhdfzgdcfhgfzgjgjaf");
      console.log(token);
    }catch(error){
      res.send("the error if occured");
    }
 }
empSchema.pre("save",async function(next){
    if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,10);
    }
    next();
})
const EmpCollection=new mongoose.model('Agrawal',empSchema);
module.exports=EmpCollection;
