const jwt = require('jsonwebtoken');

const createToken = ({payload}) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
} 


// const verifyToken = (req, res, next) => {
//     const token = req.cookies.jwt
//     if(!token) return res.status(401).json({ error: 'token not found'})

//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
//     if(decodedToken) {
//         req.user = { id: }
//     }
// }

const sendCookies = async ({res, user}) => {
    try {
        const token = createToken({payload: user })
        res.cookie('token', token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        signed: true,
        httpOnly: true
      })  
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)


module.exports = {
    isTokenValid,
    createToken,
    sendCookies
}