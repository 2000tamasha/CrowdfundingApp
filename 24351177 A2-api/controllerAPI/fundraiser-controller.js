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





//Part 2 (Assignment 3)
// Retrieve fundraisers by id including their donations


router.get("/funds/:id", (req, res) => {
    const fundId = req.params.id;

    // Query to get fundraiser details along with category
    const fundQuery = `
        SELECT 
            FUNDRAISER.*,
            NAME
        FROM FUNDRAISER 
        INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID
        WHERE FUNDRAISER.FUNDRAISER_ID = ?`;

    // Query to retrieve donations for a fundraiser
    const donationQuery = `
        SELECT 
            DONATION.* 
        FROM DONATION
        WHERE DONATION.FUNDRAISER_ID = ?`;

    // Execute funraiser query
    connection.query(fundQuery, [fundId], (fundraiserError, fundResult) => {
        if (fundraiserError) {
            console.error("Error retrieving fundraiser details", fundraiserError);
            return res.status(500).send("Error retrieving fundraiser details");
        }

        // If no fundraiser is found, return 404
        if (fundResult.length === 0) {
            return res.status(404).json({ error: "Fundraiser not found" });
        }

        // Execute donation query
        connection.query(donationQuery, [fundId], (donationError, donationResult) => {
            if (donationError) {
                console.error("Error retrieving donations", donationError);
                return res.status(500).send("Error retrieving donations");
            }

            // Combine fundraiser details with its related donations
            const response = {
                fundraiser: fundResult[0], // The fundraiser info
                donations: donationResult         // Array of donations for specific fundraiser
            };

            // combined response
            res.json(response);
        });
    });
});

















module.exports = router;
