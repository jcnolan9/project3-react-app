const { Schema, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat')

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
        default: Date.now(),
        get: (timestamp) => dateFormat(timestamp)
    },
    message: {
        type: String,
        maxlength: 200
    },
    reminderOfUser: {
        type: String,
        required: true
    },
})

const Reminder = model('Reminder', reminderSchema)

module.exports = Reminder