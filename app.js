var express = require('express');
//Instaniating a express object
var app = express();         
//loading router file to define routes to handle requests  to input values to database
var receive = require('./receive');    

//loading router file to define routes to handle requests to search element from database 
var display = require('./display');

app.enable('trust proxy');

app.use('/',(req,res,next) => {
    console.log('Time is ' + Date.now());
    console.log(req.connection.remoteAddress);
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

app.listen('8080',() => {
    console.log("Listening on Port 8080");
});