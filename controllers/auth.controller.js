const jwt = require('jsonwebtoken');
const createError = require('http-errors')
const { StatusCodes } = require('http-status-codes')
const User = require("../models/User.model");

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;

    const LOGIN_ERROR_MESSAGE = 'Email or password invalid';

    const errorFn = () => next(createError(StatusCodes.BAD_REQUEST, LOGIN_ERROR_MESSAGE));

    if (!email || !password) {
        return errorFn();
    }

    // Buscar si existe un usuario con ese email

    User.findOne({ email })
        .then(user => {
            if (!user) {
                errorFn();
            } else {

                // Comparo contraseñas

                return user.checkPassword(password)
                    .then(match => {
                        if (!match) {
                            errorFn();
                        } else {

                            // Creo el token y lo mando

                            const token = jwt.sign(
                                { id: user.id },
                                process.env.JWT_SECRET || 'password',
                                { expiresIn: '6d' }
                            )

                            res.json({ accessToken: token });
                        }
                    })
            }
        })
        .catch(next)
}

module.exports.activate = (req, res, next) => {
    const { token } = req.params;
    console.log('Activation token received:', token);
    User.findOneAndUpdate(
        { activationToken: token },
        { isActive: true },
        { new: true }
    )
        .then((dbUser) => {
            console.log('User activated:', dbUser);
            res.json({ email: dbUser.email, message: 'Account activated successfully!' });
        })
        .catch((error) => {
            console.error('Activation error:', error);
            res.status(500).json({ error: 'Activation failed. Please try again.' });
        });
 }