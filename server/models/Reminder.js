const { Schema, model } = require('mongoose')

const reminderSchema = new Schema({
    contact: {
        type: Schema.Types.ObjectID,
        ref: 'Contact'
    },
    contactType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        maxlength: 200
    }
})

const Reminder = model('Reminder', reminderSchema)

module.exports = Reminder