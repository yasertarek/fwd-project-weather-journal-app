// Global variables
const port = 8080;
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
var express = require('express');

// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
app.listen(port, (req, res) => {
    console.log(`Server is listening on ${port} port`);
});
// POST route For Getting Data
app.post('/postRequest', (req,res) => {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    console.log(projectData);
});
app.get('/getData', (req, res) => {
    res.send(projectData);
});
// function getData(req, res){

// }