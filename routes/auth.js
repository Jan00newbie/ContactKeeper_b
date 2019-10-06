const express = require('express')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../Models/User')
const secret = require('../config/default.json').secret

const router = express.Router()


/**
 * @route GET /api/login
 * @desc Endpoint for user logging
 * @returns auth token
 * @access private
 */
router.post('/',[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).send(errors.array())
    }

    const { email, password } = req.body

    const foundUser = await User.findOne({email})

    const wrongDataEnteredMessage = 'The password or email that have been entered is incorrect.'

    if(!foundUser){
        return res.status(400).send({err: wrongDataEnteredMessage})
    }
    const isCorrectPassword = await bcrypt.compare(password, foundUser.password);
    
    if(!isCorrectPassword){
        return res.status(400).send({err: wrongDataEnteredMessage})
    }

    const token = jwt.sign({id: foundUser._id}, secret, {
        expiresIn: '1h'
    })

    return res.status(200).send({token})
})

module.exports = router