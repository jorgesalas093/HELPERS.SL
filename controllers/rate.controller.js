const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const Rate = require('../models/Rate.Model');

module.exports.createRate = (req, res, next) => {
    const { receiverId } = req.params;
    const { rate } = req.body;
    const { currentUserId } = req;

    if (currentUserId === receiverId) {
        return next(createError(StatusCodes.BAD_REQUEST, 'Cannot rate yourself'));
    }

    Rate.create({
        postRate: currentUserId,
        receiverRate: receiverId,
        rate: rate
    })
        .then(rate => {
            res.status(StatusCodes.CREATED).json(rate);
        })
        .catch(next);
};
