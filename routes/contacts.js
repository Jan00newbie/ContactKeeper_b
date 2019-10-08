const express = require('express')
const auth = require('../middleware/auth')
const {
    check,
    validationResult
} = require('express-validator')
const Contact = require('../Models/Contact')
const User = require('../Models/User')
const router = express.Router()

/**
 * @route GET /api/contacts
 * @desc Get all contacts
 * @returns All users's contacts
 * @access private
 */
router.get('/', auth, (req, res) => {
    
})

/**
 * @route POST /api/contacts
 * @desc Add contact
 * @access private
 */
router.post('/',[
    auth,
    check('name', 'Please privide name of contact.').not().isEmpty(),
    check('email', 'Please privide valid email.').isEmail().optional(),
    check('phone', 'Please privide valid phone.').isMobilePhone().optional()
    ], async (req, res) => {
        
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).send(errors.array())
        }
        
        const userId = req.userId
        const foundUser = await User.findById(userId)
        
        if(!foundUser){
            return res.status(404).send({err: 'User id in token is not apropierate.'})
        }

        const { name, email, phone } = req.body

        const contact = new Contact({
            user: userId,
            name,
            email,
            phone
        })

        try {
            const result = await contact.save()
            res.json(result)
        } catch(err) {
            return res.status(404).send({err: 'Write error.'})
        }
    }
)

/**
 * @route POST /api/contacts
 * @desc Update contact
 * @access private
 */
router.put('/', auth, (req, res) => {
    res.send("Update contact")
})

/**
 * @route POST /api/contacts
 * @desc Update contact
 * @access private
 */
router.delete('/', auth, (req, res) => {
    res.send("Update contact")
})

module.exports = router