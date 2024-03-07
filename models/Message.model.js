const mongoose = require('mongoose');


const messsageSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: [true, 'Required field'],
        },
        chatId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Chat',
            required: [true, 'Required field'],
        },
        text: {
            type: String,
            required: [true, 'Required field'],
        },
    }, { timestamps: true }

);


const Message = mongoose.model('Message', messsageSchema);
module.exports = Message
