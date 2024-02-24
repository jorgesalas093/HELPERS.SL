const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const Comment = require("../models/Comment.model");


module.exports.createComment = (req, res, next) => {
    Comment.create({ text: req.body.text, writer: req.currentUserId, receiver: req.params.userId })
        .then(comment => res.json(comment))
        .catch(next)
}

module.exports.getComment = (req, res, next) => {
    Comment.find({receiver: req.params.userId}).sort({ createdAt: "desc" })
    .then(comment => {
        res.json(comment);
    })
    .catch(next);
}
