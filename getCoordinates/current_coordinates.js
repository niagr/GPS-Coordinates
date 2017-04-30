const router = require('express').Router();
const bodyParser = require('body-parser');
const search = require('./id_query'); 


router.use(bodyParser.urlencoded({extended : true}));

router.get('/',(req,res)=> {
    const route_id = req.query['route_id']; 
    search(req,res,route_id);
});

module.exports = router;