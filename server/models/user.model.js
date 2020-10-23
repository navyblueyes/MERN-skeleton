// server/models/user.model.js

import mongoose from 'mongoose'


// Define base UserSchema
const UserSchema = new mongoose.Schema({
    // defining schema consisting of ...
    //    name
    //    email
    //    created-at timestamp
    //    last-updated-at timestamp
    //    hashed password
    //    password salt

    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },

    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },

    about: {
        type: String,
        trim: true
    },

    created: {
        type: Date,
        default: Date.now
    },

    updated: Date,

    hashed_password: {
        type: String,
        required: "Password is required"
    },

    salt: String
})

// Define UserSchema methods

UserSchema.methods = {
    authenticate: function (plainText) {
        // verify sign-in attemps by... matching password text with hashed_password
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
        // generate hashed_password using crypto module
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
            // .createHmac creates an HMAC object based on algorithm [https://tinyurl.com/ydfpv88f]
            // .update loads password to crypto
            // .digest calculates data to be hashed using the encoding 'hex' [https://tinyurl.com/yyvj6soo]
        } catch (err) {
            return ''
        }
    },
    makeSalt: function() {
        // generate salt with Math random
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}


// Run functions on UserSchema
// utilize virtuals [https://rb.gy/ckdccc] to handle password without persistence on MongoDB
// get password, set a new salt, set a hashed-password
// return the password
UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })

// utilize UserSchema to provide password validation
UserSchema
    .path('hashed_password')
    .validate(function(v) {
        if (this._password && this._password.length < 6) {
            this.invalidate('password', 'Password must be at least 6 characters')
        }
        if (this.isNew && !this._password) {
            this.invalidate('password', 'Password is required')
        }
    }, null)

export default mongoose.model('User', UserSchema)
