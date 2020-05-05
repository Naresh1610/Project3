//main file
var express = require('express');
var app = express();


// For POST-Support 
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//loading API Endpoints at app.js
var API = require('./app')
API.endpoints(app)


//server
var server = app.listen(5000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })





