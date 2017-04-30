const pool = require('../pg-pool');

function search(req,res,route_id){
    pool.connect((err,client,release) => {
        if(err){
            res.send('Connection Failed')
            return console.log("Error" + err);
        }
        //to store the row returned from query
         var trip_id = [];
         console.log(typeof route_id);
         //query to get current coordinates
       client.query("SELECT trip_id FROM gettripid WHERE route_id =" +route_id ,
         (err, trip_id) => {
             if(err){
                 return console.log(err);
            }
            console.log(trip_id.rows[0].trip_id);
            client.query("SELECT latitude,longitude FROM location WHERE trip_id='" + trip_id.rows[0].trip_id + "' ORDER BY sr_no DESC LIMIT 1",
            (err,coordinates) =>{
                if(err)
                 return console.log(err);       
                
                console.log(coordinates);
                res.send(coordinates.rows); 
           });
        // res.end();                    
         });
    });
}
module.exports = search;