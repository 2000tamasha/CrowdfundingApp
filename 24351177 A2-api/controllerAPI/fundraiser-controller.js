var dbcon = require("../crowdfunding_db");

var connection = dbcon.getconnection();
connection.connect();
var express = require('express');
var router = express.Router();

router.get("/", (req, res)=>{
	connection.query("select * from FUNDRAISER", (err, records,fields)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})

//Part 2
// 1. Retrieve all active fundraisers including the category
router.get("/active", (req, res) => {
    connection.query(
        `SELECT FUNDRAISER.*,NAME 
         FROM FUNDRAISER  
         INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID 
         WHERE FUNDRAISER.ACTIVE = 'Active'`, 
        (err, records) => {
            if (err) {
                console.error("Error retrieving active fundraisers", err);
                res.status(500).send("Error retrieving data");
            } else {
                res.json(records);
            }
        }
    );
});



//Part 2
// 4. Retrieve a specific fundraiser by id
router.get("/:id", (req, res)=>{
	connection.query("select * from FUNDRAISER where FUNDRAISER_ID= ?" , req.params.id, (err, records,fields)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})
module.exports = router;
