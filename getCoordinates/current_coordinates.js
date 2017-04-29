const router = require('express').Router();
const bodyParser = require('body-parser');
const search = require('./id_query'); 


router.use(bodyParser.urlencoded({extended : true}));

router.post('/',(req,res)=> {
    const id = req.body.id;
    search(req,res,id);
});

module.exports = router;