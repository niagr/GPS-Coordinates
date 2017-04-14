const Pool = require('pg').Pool;
//Storing the database credentials in an object, which will be passed to the Pool constructor
const config = {
        user : 'postgres',
        password : 'hello',
        database : 'gpscord',
        host : 'localhost',
        //max number of client in pool
        max : 10,
        //closes and removes client which have been idle for 2 seconds
        idleTimeoutMillis : 2000
 };
// creating a new Pool object and passing it to the module which requires this module
module.exports = new Pool(config);