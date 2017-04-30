const router = require('express').Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended : true}));
const pool = require('../pg-pool');

router.post('/',(req,res) => {
    //store route_id and trip_id from http request
    const route_id = req.body.route_id;
    const trip_id = req.body.trip_id;
    //reject if any value is null
    if(route_id === null || trip_id === null)
        res.send("Enter Valid values");
    
    pool.connect((err,client,release) => {
        if(err)
            return console.log(err);
        //add values to database
        client.query("INSERT INTO gettripid VALUES($1,$2)",[parseInt(route_id),trip_id],
        (err) => {
            release();
            if(err)
                return console.log(err);
            res.send("Added");
        });    
    });
});

module.exports = router;