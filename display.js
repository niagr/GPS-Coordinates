"use strict"

var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended : true}));

router.get('/', (req, res) => {
    const count = req.query['count'];
    display(req, res, count);
})


module.exports = router;

function display(req,res, cnt) {
    //include Postgres module and accept clients from pool
    const pool = require(__dirname + "/pg-pool");
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
            //To read the html file 
            var file = fs.readFileSync(__dirname + "/display.htm",'utf-8');
            var data = "";
            //Iterating each row returned from query
            results.rows.forEach((ele,ind,arr) => {
               data = data + "<tr><td>" + ele['latitude'] + "</td><td>" + ele['longitude'] + "</td><td>"+ ele['time']+ "</td><td>"+ ele['date'] + "</td><td>"+ ele['trip_id'] +"</td></tr>"             
        })
            //Add table contents
            file = file.replace('{Rows}',data);
            res.end(file);
         });
    });
}