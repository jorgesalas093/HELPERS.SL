const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const Comment = require("../models/Comment.model");


module.exports.createComment = (req, res, next) => {
    Comment.create({ text: req.body.text, writer: req.currentUserId, receiver: req.params.userId })
        .then(comment => res.json(comment))
        .catch(next)
}

module.exports.getComment = (req, res, next) => {
    Comment.find({ receiver: req.params.userId }).sort({ createdAt: "desc" }).populate('writer')
        .then(comment => {
            res.json(comment);
        })
        .catch(next);
}

module.exports.deleteComment = (req, res, next) => {
    const commentId = req.params.commentId;

    Comment.findByIdAndDelete(commentId)
        .then(deletedComment => {
            if (!deletedComment) {
                return res.status(404).json({ message: 'Comentario no encontrado' });
            }
            res.json({ message: 'Comentario eliminado con éxito' });
        })
        .catch(error => {
            console.error('Error en la eliminación del comentario:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        });
}