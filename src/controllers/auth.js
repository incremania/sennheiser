const User = require('../models/UserModel');
const { sendCookies } = require('../utils/token')

const register = async(req, res) => {
    try {
       const {email, password, role } = req.body;
       if(!email || !password) {
        return res.status(400).json({ error: 'please provide email and password' })
      }
       const existingEmail = await User.findOne({ email })
       if(existingEmail) {
       return res.status(400).json({ error: 'email already exist'})
       } 
       const user = await User.create({email, password, role})
       const tokenUser = {email: user.email, role: user.role, userId: user._id}
       sendCookies({res, user: tokenUser})
       res.status(201).json({ user: tokenUser })
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body; 
        if(!email || !password) {
          return res.status(400).json({ error: 'please provide email and password' })
        }
        const user = await User.login(email, password);
        const tokenUser = {email: user.email, role: user.role, userId: user._id}
        sendCookies({res, user: tokenUser})
        res.status(200).json({ user })
    } catch (error) {
       
        res.status(500).json({ error: error.message}) 
    }
}
   
module.exports = {
    register,
    login
}