var dbcon = require("../crowdfunding_db");

var connection = dbcon.getconnection();
connection.connect();
var express = require('express');
var router = express.Router();