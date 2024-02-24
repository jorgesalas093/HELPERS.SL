const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const Message = require("../models/Message.model");
const Chat = require("../models/chat.model");





module.exports.create = (req, res, next) => {
    Message.create({ text: req.body.text, user: req.currentUserId, chatId: req.params.chatId })
        .then(message => {
            res.status(StatusCodes.CREATED).json(message)
        })
        .catch(next)
}

module.exports.getCurrentUserMessageById = (req, res, next) => {
    Message.find({ user: req.currentUserId }).sort({ createdAt: "desc" })
        .then(messages => {
            res.json(messages);
        })
        .catch(next);
}
