const jwt = require('jsonwebtoken')
const secret = require('../config/default.json').secret

module.exports = (req, res, next) =>{
    const bearerToken = req.headers.authorization

    if(bearerToken){
        try {
            const authToken = bearerToken.split(' ')[1]
            const data = jwt.verify(authToken, secret)
            req.userId = data.id
        } catch(err) {
            return res.status(401).send({err: 'Your authorization is incorrect or your access expired! Please login again!'})
        }
    } else {
        return res.status(401).send({err: 'Please login first!'})
    }
    next()
}