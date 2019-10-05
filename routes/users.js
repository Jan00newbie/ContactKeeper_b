const express = require('express')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const User = require('../Models/User')


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
            
        if(!errors.isEmpty()){
            return res.status(400).send(errors.array())
        }

        const { email, name, password } = req.body

        const foundUser = await User.findOne({email})
        
        if(foundUser){
            return res.status(400).send({err:'User already exist!'})            
        }

        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            password: hash,
            email
        });

        user.save()
            .then(result => res.status(200).send(result))
            .catch(err => res.status(500).send({
                err: "Cannot save user to database!"
            }))
})

module.exports = router