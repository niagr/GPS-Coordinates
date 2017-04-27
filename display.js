"use strict"

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended : true}));

router.post('/',(req,res,next) => {
    display(req,res);
});


module.exports = router;

function display(req,res) {
    //include Postgres module and accept clients from pool
    const pool = require(__dirname + "/pg-pool");
    const cnt = req.body.count;
    console.log(cnt);
     pool.connect((err,client,release) => {
        if(err){
            res.send('Connection Failed')
            return console.log("Error" + err);
        }
         var results = [];
       client.query('SELECT * FROM location ORDER BY time DESC LIMIT ' + cnt,
         (err, results) => {
            //return the client back after you are done using it 
            release();
             if(err){
                 return console.log(err);
            }
            
            //'results.rows' contains the data of the rows selected from the query
            res.send(results.rows);
            // console.log(results.rows);
         });
    });
}