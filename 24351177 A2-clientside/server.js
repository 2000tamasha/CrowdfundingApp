const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");

const app=express();

//to parse URL-encoded & JSON data 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//to serve static files
app.use(express.static(__dirname));

//route to serve index.html
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"index.html"));
});

//route to serve index.html
app.get("/search",(req,res)=>{
  res.sendFile(path.join(__dirname,"search.html"));
});

//route to serve fundraiser.html
app.get("/fundraiser",(req,res)=>{
  res.sendFile(path.join(__dirname,"fundraiser.html"));
});

//route to serve donation.html
app.get("/donation",(req,res)=>{
  res.sendFile(path.join(__dirname,"donation.html"));
});


//route to serve admin.html
app.get("/admin",(req,res)=>{
  res.sendFile(path.join(__dirname,"admin.html"));
});

//route to serve add_fund.html
app.get("/addFund",(req,res)=>{
  res.sendFile(path.join(__dirname,"add_fund.html"));
});







app.listen(8080,()=>{
  console.log("Running in 8080");
});