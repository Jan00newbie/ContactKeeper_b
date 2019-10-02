const express = require('express')
const router = express.Router()
/**
 * @route GET /api/users
 * @desc Get all users
 * @access private
 */
router.get('/', (req, res) => {
    res.send("users")
})

module.exports = router