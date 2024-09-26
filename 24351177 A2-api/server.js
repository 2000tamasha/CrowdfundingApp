var express = require('express');
var app = express();
var cors = require('cors'); // Import CORS package
app.use(cors());

var fundraiserAPI = require('./controllerAPI/fundraiser-controller');
var searchAPI = require('./controllerAPI/search-controller');



app.use('/api/FUNDRAISER', fundraiserAPI);
app.use('/api/search', searchAPI);

app.listen(3060);
console.log("Server up and running on port 3060");