const mongoose = require('mongoose');


const chatSchema = mongoose.Schema(
    {
        user1: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: [true, 'Required field'],
        },
        user2: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: [true, 'Required field'],
        }
    },
    {
        timestamps: true,
        toJSON: {
          transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          },
        },
      }

);

chatSchema.virtual('messages', {
    ref: 'Messsage',
    localField: '_id',
    foreignField: 'chatId',
    justOne: false
})



const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat
