const express = require('express')
const {
    check,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../Models/User')
const secret = require('../config/default.json').secret


const router = express.Router()

/**
 * @route GET /api/users
 * @desc Get all users
 * @access private
 */
router.get('/', (req, res) => {
    res.send("Get users")
})


/**
 * @route POST /api/users
 * @desc Create new user
 * @returns auth token
 * @access public
 */
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({
            min: 6
        }),
    ],
    async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array())
        }

        const { email, name, password } = req.body

        const foundUser = await User.findOne({
            email
        })

        if (foundUser) {
            return res.status(400).send({
                err: 'User already exist!'
            })
        }

        const salt = await bcrypt.genSalt()

        const hash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            password: hash,
            email
        })

        const savedUser = await user.save()

        const token = jwt.sign({id: savedUser._id}, secret, {
            expiresIn: '1h'
        })

        return res.status(200).send({token})
    })

module.exports = router