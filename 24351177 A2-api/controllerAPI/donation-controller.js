var dbcon = require("../crowdfunding_db");

var connection = dbcon.getconnection();
connection.connect();
var express = require('express');
var router = express.Router();





//Get for viewing donations (optional)

router.get("/", (req, res)=>{
	connection.query("select * from DONATION", (err, records,fields)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})









//post for inserting donations(Assignement 3)
router.post("/", (req, res)=>{
	var AMOUNT = req.body.AMOUNT;
        var GIVER = req.body.GIVER;
        var FUNDRAISER_ID = req.body.FUNDRAISER_ID;
	connection.query("INSERT INTO DONATION VALUES('"+AMOUNT+"','"+GIVER+"','"+FUNDRAISER_ID+"')",  
	(err, result)=> {
		 if (err){
			 console.error("Error while retrieve the data" + err);
		 }else{
			 res.send({insert:"success"});
		 }
	})
})















module.exports = router;