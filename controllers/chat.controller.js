const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const Message = require("../models/Message.model");
const Chat = require("../models/Chat.model");


module.exports.createChat = (req, res, next) => {
    Chat.findOne({ users: { $all: [req.currentUserId, req.params.userId] } })
        .then(chat => {

            if (!chat) {
                return Chat.create({ users: [req.currentUserId, req.params.userId] })
                    .then(chat => res.json(chat))
            } else {
                console.log('ya tienes un chat')
                res.json(chat)
            }
        })
        .catch(next)

}

module.exports.allChats = (req, res, next) => {
    Chat.find({ users: { $in: [req.currentUserId] } })
}


module.exports.getChat = (req, res, next) => {
    Chat.findById(req.params.chatId)
        .populate('users')
        .populate({
            path: "messages",
            populate: {
                path: "user"
            }
        })
        .then(chat => res.json(chat))
}