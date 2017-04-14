"use strict"

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended : true}));

router.get('/',(req,res,next) => {
    display(req,res);
});


module.exports = router;

function display(req,res) {
    //include Postgres module and accept clients from pool
    const pool = require(__dirname + "/pg-pool");
    const user = req.body;

     pool.connect((err,client,release) => {
        if(err){
            res.send('Connection Failed')
            return console.log("Error" + err);
        }
         var results = [];
       client.query('SELECT * FROM location;',
         (err, results) => {
            //return the client back after you are done using it 
            release();
             if(err){
                 return console.log(err);
            }
            
            //'results.rows' contains the data of the rows selected from the query
            res.send(results.rows);
         });
    });
}