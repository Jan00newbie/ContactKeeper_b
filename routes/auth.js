const express = require('express')
const router = express.Router()


/**
 * @route GET /api/login
 * @desc Endpoint for user logging
 * @returns auth token
 * @access private
 */
router.get('/', (req, res) => {
    res.send("auth")
})

module.exports = router