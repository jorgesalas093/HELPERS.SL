const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const Message = require("../models/Message.model");
const Chat = require("../models/chat.model");


module.exports.createChat = (req, res, next) => {
    Chat.create({ user1: req.currentUserId, user2: req.params.userId })
        .then(chat => res.json(chat))
        .catch(next)
}


module.exports.getCurrentUserChats = (req, res, next) => {
    Chat.findById(req.params.chatId)
        .populate('user1')
        .populate('user2')
        .populate('messages')
        .then(chat => res.json(chat))
}