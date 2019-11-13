const express = require('express')
const {
    check
} = require('express-validator')

const auth = require('../middleware/auth')
const validate = require('../middleware/validate')

const Contact = require('../Models/Contact')
const User = require('../Models/User')

const router = express.Router()

const sanitizeContact = ({name, _id:id, email, phone}) => ({name, id, email, phone})

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
            warnings: ["No data found."]
        })
    }
    const contactResult = contacts.map(sanitizeContact)
    
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
                warnings: ["No data found."]
            })
        }

        const contactResult = sanitizeContact(contact)

        return res.status(200).send(contactResult)

    } catch (error) {
        return res.status(404).send({
            warnings: ["No data found."]
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
            errors: ['User id in token is not apropierate.']
        })
    }
    console.log("XD");
    

    const { name, email, phone } = req.body

    const contact = new Contact({
        user: userId,
        name,
        email,
        phone
    })

    try {
        const contactDocument = await contact.save()
        const resultContact = sanitizeContact(contactDocument)
        console.log(resultContact)
        res.status(200).send(resultContact)
    } catch (err) {
        res.status(404).send({
            warnings: ['Write error.']
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

        const contactResult = sanitizeContact(updatedContact)

        return res.status(200).send(contactResult)

    } catch {
        return res.status(404).send({
            errors: ["Contact not found"]
        })
    }
})

/**
 * @route DELETE /api/contacts
 * @desc Update contact
 * @access private
 */
router.delete('/:id', auth, async (req, res) => {

    const result = await Contact.findOneAndRemove({
        _id: req.params.id,
        user: req.userId
    })

    if (!result) {
        res.status(404).send({
            errors: ["Contact not found."]
        })
    }

    res.status(200).send({
        msg: "Sucessfully removed record."
    })
})



module.exports = router