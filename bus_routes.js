const express = require('express')
const router = express.Router()

const pool = require('./pg-pool')

router.get('/',  (req, res) => {
    pool.connect((err, client, release) => {
        client.query('SELECT * from routes;', (err, result) => {
            release()
            if (err)
                return console.log('Could not get bus routes:', err)
            res.send(result.rows)
        })
    })
})

module.exports = router;