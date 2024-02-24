const { isTokenValid } = require('../utils/token')

const authenticateUser = (req, res, next) => {
    const token = req.signedCookies.token;
    if(!token) return res.status(401).json({error: 'token not found, please login'})

    const {email, role, userId}= isTokenValid(token);
    req.user = { email, role, userId}
    next()
}


const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(401).json({ error: 'unauthorized permisson'})
        }
        next();
    }
}


module.exports = {authenticateUser, authorizePermissions}