const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Acces denied!')

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        if(verified) req.user = verified

        req.token = token

        next()
    } catch(err) {
        res.status(401).send('Please authenticate')
    }
}

module.exports = auth