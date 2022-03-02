const { Schema, model } = require('mongoose')

const contactSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+@.+\..+/, 'Must match an email address!'] 
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
        unique: false
    },
    contactOfUser: {
        type: String,
        required: true
    }
})

const Contact = model('Contact', contactSchema)

module.exports = Contact