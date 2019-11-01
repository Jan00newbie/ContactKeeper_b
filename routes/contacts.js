const express = require('express')
const {
    check
} = require('express-validator')

const auth = require('../middleware/auth')
const validate = require('../middleware/validate')

const Contact = require('../Models/Contact')
const User = require('../Models/User')

const router = express.Router()

/**
 * @route GET /api/contacts
 * @desc Get all contacts
 * @returns All users's contacts
 * @access private
 */
router.get('/', auth, async (req, res) => {
    const userId = req.userId

    const contacts = await Contact.find({
        user: userId
    })

    if (!contacts) {
        res.status(404).send({
            err: "No data found."
        })
    }
    const contactResult = contacts.map(({name, _id, email, phone}) => (
        {
            name,
            id: _id,
            email,
            phone
        }
        ))
    res.status(200).send(contactResult)
})


/**
 * @route GET /api/contacts
 * @desc Get contact
 * @returns Users contact with given id
 * @access private
 */
router.get('/:id', auth, async (req, res) => {
    const userId = req.userId

    try {

        const contact = await Contact.findOne({ user: userId, _id: req.params.id})
        
        if (!contact) {
            return res.status(404).send({
                err: "No data found."
            })
        }

        const { name, _id, email, phone } = contact
    
        const contactResult = { name, _id, email, phone }

        res.status(200).send(contactResult)

    } catch (error) {
        return res.status(404).send({
            err: "No data found."
        })
    }
})

/**
 * @route POST /api/contacts
 * @desc Add contact
 * @access private
 */
router.post('/', [
    auth,
    check('name', 'Please privide name of contact.').not().isEmpty(),
    check('email', 'Please privide valid email.').isEmail().optional(),
    check('phone', 'Please privide valid phone.').isMobilePhone().optional(),
    validate
], async (req, res) => {

    const userId = req.userId
    const foundUser = await User.findById(userId)

    if (!foundUser) {
        return res.status(404).send({
            err: 'User id in token is not apropierate.'
        })
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
        return res.status(200).json(result)
    } catch (err) {
        return res.status(404).send({
            err: 'Write error.'
        })
    }
})

/**
 * @route PUT /api/contacts
 * @desc Update contact
 * @access private
 */
router.put('/:id', [
    auth,
    check('name', 'Please privide name of contact.').optional(),
    check('email', 'Please privide valid email.').isEmail().optional(),
    check('phone', 'Please privide valid phone.').isMobilePhone().optional(),
    validate
], async (req, res) => {

    const update = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }

    try {
        const updatedContact = await Contact.findOneAndUpdate({
            _id: req.params.id,
            user: req.userId
        }, update, {
            new: true,
            upsert: true
        })

        return res.status(200).send(updatedContact)

    } catch {
        return res.status(404).send({
            err: "Contact not found"
        })
    }
})

/**
 * @route DELETE /api/contacts
 * @desc Update contact
 * @access private
 */
router.delete('/', auth, async (req, res) => {

    const result = await Contact.findOneAndRemove({
        _id: req.body.id,
        user: req.userId
    })

    if (!result) {
        res.status(404).send({
            err: "Contact not found."
        })
    }

    res.status(200).send({
        msg: "Sucessfully removed record."
    })
})



module.exports = router