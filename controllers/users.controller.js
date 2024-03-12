const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const User = require("../models/User.model");
const { populate } = require('../models/Comment.model');
const { transporter, createEmailTemplate } = require('../config/nodemailar.config')
const JOBS_ENUM = ['Carer', 'Carpenter', 'Brickwork', 'Chef', 'Closet Organizer', 'Electrician', 'Assembler', 'Gardener', 'Home Cleaner', 'Locksmith', 'Messenger', 'Painter', 'Plumber', 'Teacher', 'Welder']


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
    const typejob = req.params.typejob.toLowerCase();

    User.find({ typejob: { $in: [typejob] } })
        .then(users => {
            res.json(users);
        })
        .catch(next);
}

module.exports.getCurrentUser = (req, res, next) => {
    getUser(req.currentUserId, req, res, next);
}

module.exports.deleteCurrentUser = (id, req, res, next) => {
    User.findByIdAndDelete(id)
        .then(user => {
            if (!user) {
                next(createError(StatusCodes.NOT_FOUND, 'User not found'))
            } else {
                res.json("user delete")
            }
        })
        .catch(next)
}


module.exports.getUser = (req, res, next) => {
    getUser(req.params.id, req, res, next)
}




//PARA EL PUT, MANDAR EL BODY AND ID, Y UTILIZAR FIND BY ID AND UPDATE
module.exports.editUser = (req, res, next) => {
    const { avatar, username, email, password, biography, birthday, typejob } = req.body;
    const { currentUserId } = req;


    const updateFields = {};
    if (avatar) updateFields.avatar = avatar;
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (password) updateFields.password = password;
    if (biography) updateFields.biography = biography;
    if (birthday) updateFields.birthday = birthday;
    if (typejob) updateFields.typejob = typejob.split(' ');

    User.findByIdAndUpdate(currentUserId, updateFields, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(updatedUser);
        })
        .catch(error => {
            console.error('Error updating user:', error);
            next(error);
        });
};


module.exports.getEnumValues = (req, res, next) => {
    res.json(JOBS_ENUM)
};