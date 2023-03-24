const express=require("express");
const path=require("path");
const hbs=require("hbs");
const app=express();
const nodemailer=require("nodemailer");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("./db/conn");
const port=3000;
const bodyparser=require('body-parser');
const EmpCollection=require("./models/registers");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const static_path=path.join(__dirname, "../public");
const template_path=path.join(__dirname,"../templates/views");
const partial_path=path.join(__dirname,"../templates/partials");

app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.static(static_path));
app.set("view engine","hbs");

app.set("views",template_path);
hbs.registerPartials(partial_path);
app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/index",(req,res)=>{
    res.render("index");
});

app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

const sendverifyEmail=async(name,email,user_id)=>{
    try{
       nodemailer.createTransport({
        host:'smtp.'
       })
    }
    catch(error){
        console.log("Not verify the email");
    }
};

app.post('/signup',async(req,res)=>{
    try{
        const password=req.body.password;
    const cpassword=req.body.cpassword;

    if(password===cpassword){
        const register=new EmpCollection(req.body)
        
        console.log("the succes part"*register);
        const token=await register.generateAuthToken();
        const postData=await register.save();
        console.log(postData);
        send
        res.render("index");
    }

    else{
        res.send("password are not matching");
    }
    }catch(error){
     res.status(400).send(error);
    }
})

app.post("/login",async(req,res)=>{
    try{
        const{
            email,
            password
        }=req.body;
        const useremail=await EmpCollection.findOne({email:email});
        const passwordmatch=await bcrypt.compare(password,useremail.password);
        if(passwordmatch){
            res.status(201).render("index");
        }
        else{
            res.send("password are not matching");
        }
    }catch(error){
     res.status(400).send("Invalid Email");
    }
})
// const createToken=async()=>{
//     const token=await jwt.sign({_id:"2556535665"},"hbgcsgdjggaggjgjgjgjdgmgggvxgsshshvhdhgfhvdjfgjfdggsf",{
//         expiresIn:"1 day"
//     });
//     console.log(token);

//     const userVer=await jwt.verify(token,"hbgcsgdjggaggjgjgjgjdgmgggvxgsshshvhdhgfhvdjfgjfdggsf");
//     console.log(userVer);
// }
// createToken();
app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})
