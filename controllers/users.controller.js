const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const User = require("../models/User.model");
const { populate } = require('../models/Comment.model');
const { transporter, createEmailTemplate } = require('../config/nodemailar.config')
const JOBS_ENUM = ['CARER', 'CARPENTER', 'LOOKSMITH', 'CHEF', 'TEACHER', 'ELECTRICIAN', 'PLUMBER', 'MESSENGER', 'FITTER', 'CLOSET ORGANIZER', 'HOME CLEANER', 'GERDENER', 'PAINTER', 'BRICKWORK', 'WELDER']
module.exports.create = (req, res, next) => {
    const userToCreate = {
        ...req.body,
        avatar: req.file.path
    }

    User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] })
        .then(user => {
            if (user) {
                next(createError(StatusCodes.BAD_REQUEST, 'Username or email already in use'));
            } else {
                return User.create(userToCreate)
                    .then(userCreated => {
                        transporter.sendMail(
                            {
                                from: process.env.NODEMAILER_EMAIL,
                                to: userCreated.email,
                                subject: "Bienvenido a tu aplicación",
                                html: createEmailTemplate(userCreated),
                            },
                            function (error, info) {
                                if (error) {
                                    console.error('Error al enviar el correo:', error);
                                } else {
                                    console.log('Correo electrónico enviado:', info.response);
                                }
                                // Responde al cliente
                                res.status(StatusCodes.CREATED).json(userCreated);
                            }
                        );
                    })
                    .catch(next);
            }
        })
        .catch(next);
};

const getUser = (id, req, res, next) => {
    User.findById(id)
        .populate({ path: 'comments', populate: { path: 'writer' } })
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


module.exports.editUser = (req, res, next) => {
    const { avatar } = req.body;

    User.findByIdAndUpdate(req.currentUserId, { avatar }, { new: true })
        .then(updatedUser => {
            res.json(updatedUser);
        })
        .catch(error => {
            next(error);
        });
}

//PARA EL PUT, MANDAR EL BODY AND ID, Y UTILIZAR FIND BY ID AND UPDATE

module.exports.getEnumValues = (req, res, next) => {
    res.json(JOBS_ENUM)
};