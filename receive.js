"use strict"

var express = require('express');
var router = express.Router();
 //To access the Http Request Body
var bodyParser = require('body-parser');

//To add 'body' property to request object
router.use(bodyParser.urlencoded({extended : true}));

router.post('/',(req,res,next) => {
    //Add the values received from the form to Database
    addToDataBase(req,res);         
});

function addToDataBase(req,res){
    //include Postgres module and accept clients from pool
    const pool = require(__dirname + "/pg-pool");
    //Storing the body content in 'user'
    const input = req.body;

    //Check for null values 
    if(input.latitude == '' || input.longitude == '' || input.time == '' || input.trip_id == ''){
        res.send('<h1>Input Some Values Ediot</h1>\n');
    }
    else {
        //timeStamp is received together, so separating it by using split()
        const timeDate =   input['time'].split(" ");
    // Connect to database
   pool.connect((err, client, release) => {
        if(err){
            res.send('Connection Failed')
            return console.log("Error" + err);
        }
        //insert tuple to database
        client.query('INSERT INTO location(latitude,longitude,time,date,trip_id) VALUES ($1,$2,$3,$4,$5);', [input.latitude,input.longitude,timeDate[0],timeDate[1],input.trip_id],
        (err, result) => {
         //return the client back after you are done using it
            release();
            if(err){
                res.send('Please Enter valid Values\n');
                return console.log("Query Error " ,err);
            }
            res.send("ADDED TO DATABASE");
        });
    });
    }
}

module.exports = router;