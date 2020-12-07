const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

UserSchema.pre('save', function(next) {
    if(!this.isModified('password')){
        return next()
    }

    bcrypt.hash(this.password, 10, (err, hashedPassword)=> {
        if(err)
            return (err)
        this.password = hashedPassword;
        return next()
    })
})

module.exports = mongoose.model("User", UserSchema);