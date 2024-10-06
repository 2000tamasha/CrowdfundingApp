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




//post method to enter new fundraiser to database (Assignment 3)
router.post("/", (req, res)=>{
	var FUNDRAISER_ID = req.body.FUNDRAISER_ID;
	var ORGANIZER = req.body.ORGANIZER;
	var CAPTION = req.body.CAPTION;
        var TARGET_FUNDING = req.body.TARGET_FUNDING;
        var CURRENT_FUNDING = req.body.CURRENT_FUNDING;
        var CITY = req.body.CITY;
        var ACTIVE = req.body.ACTIVE;
        var CATEGORY_ID = req.body.CATEGORY_ID;
	connection.query("INSERT INTO FUNDRAISER VALUES('"+FUNDRAISER_ID+"','"+ORGANIZER+"','"+CAPTION+"','"+TARGET_FUNDING+"',"+CURRENT_FUNDING+",'"+CITY+"','"+ACTIVE+"','"+CATEGORY_ID+"')",  
	(err, result)=> {
		 if (err){
			 console.error("Error while retrieve the data" + err);
		 }else{
			 res.send({insert:"success"});
		 }
	})
})




router.put("/:id", (req, res)=>{
        var FUNDRAISER_ID = req.params.id;
	var ORGANIZER = req.body.ORGANIZER;
	var CAPTION = req.body.CAPTION;
        var TARGET_FUNDING = req.body.TARGET_FUNDING;
        var CURRENT_FUNDING = req.body.CURRENT_FUNDING;
        var CITY = req.body.CITY;
        var ACTIVE = req.body.ACTIVE;
        var CATEGORY_ID = req.body.CATEGORY_ID;
	connection.query("UPDATE FUNDRAISER SET ORGANIZER='"+ORGANIZER+"', CAPTION='"+CAPTION+"',TARGET_FUNDING='"+TARGET_FUNDING+"',CURRENT_FUNDING='"+CURRENT_FUNDING+"',CITY='"+CITY+"',ACTIVE='"+ACTIVE+"',CATEGORY_ID='"+CATEGORY_ID+"' where FUNDRAISER_ID='"+FUNDRAISER_ID+"'", 
	(err, result)=> {
		 if (err){
			 console.error("Error while Updating the data" + err);
		 }else{
			 res.send({update:"success"});
		 }
	})
})




//delete fundraisers without donations (Assignment 3)
router.delete("/:id", (req, res) => {
    var FUNDRAISER_ID = req.params.id;

    // check if fundraiser has got donations
    const donationCheckQuery = "SELECT COUNT(*) AS numOfDonations FROM DONATION WHERE FUNDRAISER_ID = ?";

    connection.query(donationCheckQuery, [FUNDRAISER_ID], (err, result) => {
        if (err) {
            console.error("Error while checking donations: " + err);
            return res.status(500).send({ delete: "failed", error: err });
        }

        const numOfDonations = result[0].numOfDonations;

        if (numOfDonations > 0) {
            // Fundraiser has donations, cannot delete
            return res.status(400).send({ delete: "failed", message: "Cannot delete a fundraiser with existing donations" });
        }

        // If no donations exist, proceed to delete the fundraiser
        const deleteFundQuery = "DELETE FROM FUNDRAISER WHERE FUNDRAISER_ID = ?";

        connection.query(deleteFundQuery, [FUNDRAISER_ID], (err, result) => {
            if (err) {
                console.error("Error while deleting the fundraiser: " + err);
                return res.status(500).send({ delete: "failed", error: err });
            }

            if (result.affectedRows === 0) {
                // Fundraiser not found
                return res.status(404).send({ delete: "failed", message: "Fundraiser not found" });
            }

            // Fundraiser deleted successfully 
            res.send({ delete: "success" });
        });
    });
});









module.exports = router;
