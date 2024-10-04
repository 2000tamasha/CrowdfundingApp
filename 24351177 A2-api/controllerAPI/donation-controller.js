var dbcon = require("../crowdfunding_db");

var connection = dbcon.getconnection();
connection.connect();
var express = require('express');
var router = express.Router();



//post for inserting donations
router.post("/", (req, res)=>{
	var DONATION_ID = req.body.DONATION_ID;
	var DATE = req.body.DATE;
	var AMOUNT = req.body.AMOUNT;
        var GIVER = req.body.GIVER;
        var FUNDRAISER_ID = req.body.FUNDRAISER_ID;
	connection.query("INSERT INTO DONATION VALUES('"+DONATION_ID+"','"+DATE+"','"+AMOUNT+"','"+GIVER+"','"+FUNDRAISER_ID+"')",  
	(err, result)=> {
		 if (err){
			 console.error("Error while retrieve the data" + err);
		 }else{
			 res.send({insert:"success"});
		 }
	})
})















module.exports = router;