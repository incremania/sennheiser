const { Schema, default: mongoose } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: [isEmail, 'enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [8, 'password must be greater than 7 characters']
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: '{VALUE} is not supported'
        },
        default: 'admin'
    }
}, 
{
    timestamps: true
});

userSchema.pre('save', async function() {
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.statics.login = async function(email, password) {
    try {
       const user = await this.findOne({ email })
       if(user) {
        const isValidUser = await bcrypt.compare(password, user.password)
        if(isValidUser) {
            const userWithOutPassword = user.toObject()
            delete userWithOutPassword.password
            return userWithOutPassword
        }
        throw new Error('invalid username or password')
       } 
       throw new Error('invalid username or password')
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = mongoose.model('User', userSchema);