const mongoose = require("mongoose")
const schema = mongoose.Schema

const userSchema = new schema({
    name: {
        type: String,
        required: [true, 'error.required'],
    },
    email: {
        type: String,
        required: [true, 'error.required'],
        validate: [
            {
                validator: function (value) {
                    return /^[\w].+\@.+\..+/.test(value)
                },
                message: 'error.format'
            }
        ]
    },
    password: {
        type: String,
        required: [true, 'error.required'],
        minLength: [8, 'error.min_length']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)