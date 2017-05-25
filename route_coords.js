const express = require('express')
const router = express.Router()

const pool = require('./pg-pool')

router.get('/', (req, res) => {
    pool.connect((err, client, release) => {
        const route_id = req.query['route_id'] || 'none'
        if (route_id == 'none') {
            res.statusCode = 404
            res.send('Route does not exist')
            return
        }
        client.query('SELECT * from route_coords WHERE route_id=' + route_id + 'AND is_stop=FALSE;', (err, result) => {
            release()
            if (err)
                return console.log('Could not get route coordinates:', err)
            res.send(result.rows)
        })
    })
})

module.exports = router