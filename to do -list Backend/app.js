const express=require('express')
const app=express()
const db=require("./DBConnection/dbConnect")
const routes=require("./Route/route")
const bodyParser=require("body-parser")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.setHeader('Access-control-Allow-Headers','Content-Type');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
});

app.use("/",routes)

app.listen(3002,function(){
    console.log("server has started at port 3002")
})
module.exports=app;