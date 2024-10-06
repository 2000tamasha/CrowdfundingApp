const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");

const app=express();

//to parse URL-encoded & JSON data 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//to serve static files
app.use(express.static(__dirname));


//route to serve admin.html
app.get("/admin",(req,res)=>{
  res.sendFile(path.join(__dirname,"admin.html"));
});

//route to serve add_fund.html
app.get("/addFund",(req,res)=>{
  res.sendFile(path.join(__dirname,"add_fund.html"));
});







app.listen(8000,()=>{
  console.log("Running in 8000");
});