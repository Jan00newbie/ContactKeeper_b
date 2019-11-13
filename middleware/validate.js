const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
    const warnings = validationResult(req)
    
    if(!warnings.isEmpty()){
        const sanitizedWarnings = warnings.array().map(el => el.msg)
        return res.status(400).send({warnings: sanitizedWarnings})
    }
    next()
}