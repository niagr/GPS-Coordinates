const pool = require('../pg-pool');

function search(req,res,id){
    pool.connect((err,client,release) => {
        if(err){
            res.send('Connection Failed')
            return console.log("Error" + err);
        }
        //to store the row returned from query
         var results = [];
         //query to get current coordinates
       client.query("SELECT latitude,longitude FROM location WHERE trip_id='" + id +"' ORDER BY sr_no DESC LIMIT 1",
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
module.exports = search;