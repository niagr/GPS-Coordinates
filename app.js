const express = require('express');
//Instaniating a express object
const app = express();         
//loading router file to define routes to handle requests  to input values to database
const receive = require('./receive');    

//loading router file to define routes to handle requests to search element from database 
const display = require('./display');

//To get current coordinates
const current_coordinates = require(__dirname +'/getCoordinates/current_coordinates');

//Endpoint to receive start trip data
const startTrip = require(__dirname + "/startTrip/startTrip.js");

const bus_routes = require('./bus_routes')


app.use('/',(req,res,next) => {
    //When the middleware doesn't send back the response object, it must pass control using 'next()' 
    next();
});
//To handle GET request
app.get('/',(req,res,next) => {
    //Sending a html file as response
   res.sendFile(__dirname + '/home.html');
});

//Handles requests routed to '/receive'
app.use('/receive',receive);

//Handles requests routed to '/search'
app.use('/display',display);

//Handles requests routed to '/current_coordinates'
app.use('/current_coordinates',current_coordinates);

//
app.use('/startTrip',startTrip);

app.use('/bus_routes', bus_routes)

app.listen('8080',() => {
    console.log("Listening on Port 8080");
});