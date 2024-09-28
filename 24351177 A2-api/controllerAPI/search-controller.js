var dbcon = require("../crowdfunding_db");

var connection = dbcon.getconnection();
connection.connect();
var express = require('express');
var router = express.Router();


//Part 2
// 2. Retrieve all categories
router.get("/", (req, res)=>{
	connection.query("select * from CATEGORY", (err, records,fields)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})



//Part 2
// 3. Retrieve a fundraiser by specific criteria from the database (example: city)
router.get("/:city", (req, res)=>{
	connection.query("select * from FUNDRAISER where CITY= ?" , req.params.city, (err, records,fields)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})


// 3. Retrieve a fundraiser by specific criteria from the database (example: organizer)
router.get("/organizer/:organizer", (req, res)=>{
	connection.query("select * from FUNDRAISER where ORGANIZER= ?" , req.params.organizer, (err, records,fields)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})



// 3. Retrieve a fundraiser by multiple categories
router.get("/category/:categories", (req, res) => {
    // Split categories from the request parameter
    const categories = req.params.categories.split(',');

    // Create a SQL query with placeholders for each category
    const placeholders = categories.map(() => '?').join(',');
    const sql = `
        SELECT FUNDRAISER.*
        FROM FUNDRAISER 
        JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = c.CATEGORY_ID
        WHERE CATEGORY.NAME IN (${placeholders})
    `;

    // Execute the query, passing the categories as an array
    connection.query(sql, categories, (err, records) => {
        if (err) {
            console.error("Error while retrieving the data", err);
            res.status(500).send("Error retrieving data");
        } else {
            res.send(records);
        }
    });
});




// 3. Retrieve a fundraiser by specific criteria from the database (example: category)
router.get("/category/:category", (req, res) => {
    connection.query(
        `SELECT FUNDRAISER.*,CATEGORY.NAME 
         FROM FUNDRAISER  
         INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID 
         WHERE CATEGORY.NAME = ?
         AND FUNDRAISER.ACTIVE = 'Active'`, 
 [req.params.category],   
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








module.exports = router;
