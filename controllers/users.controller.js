const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const User = require("../models/User.model")

module.exports.create = (req, res, next) => {
    User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] })
        .then(user => {
            if (user) {
                next(createError(StatusCodes.BAD_REQUEST, 'Username or email already in use'));
            } else {
                return User.create(req.body)
                    .then(userCreated => {
                        res.status(StatusCodes.CREATED).json(userCreated)
                    })
            }
        })
        .catch(next)
}

const getUser = (id, req, res, next) => {
    User.findById(id)
        .then(user => {
            if (!user) {
                next(createError(StatusCodes.NOT_FOUND, 'User not found'))
            } else {
                res.json(user)
            }
        })
        .catch(next)
}

//usar el &:in typo trabajo pillado por el params

module.exports.getAllJobsUsers = (req, res, next) => {
    User.find({ 'typejob.0': { $exists: true } })
        .then(users => {
            res.json(users)
        })
        .catch(next)
}

module.exports.getJobsByType = (req, res, next) => {
    const typejob = req.params.typejob.toUpperCase();

    User.find({ typejob: { $in: [typejob] } })
        .then(users => {
            res.json(users);
        })
        .catch(next);
}

module.exports.getCurrentUser = (req, res, next) => {
    getUser(req.currentUserId, req, res, next);
}

module.exports.getUser = (req, res, next) => {
    getUser(req.params.id, req, res, next)
}
