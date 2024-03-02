const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const Message = require("../models/Message.model");
const Chat = require("../models/chat.model");


module.exports.createChat = (req, res, next) => {
    Chat.create({ users: [req.currentUserId, req.params.userId] })
        .then(chat => res.json(chat))
        .catch(next)
}

module.exports.allChats = (req, res, next) => {
    Chat.find({ users: { $in: [req.currentUserId] } })
}


module.exports.getChat = (req, res, next) => {
    Chat.findById(req.params.chatId)
        .populate('users')
        .populate('messages')
        .then(chat => res.json(chat))
}