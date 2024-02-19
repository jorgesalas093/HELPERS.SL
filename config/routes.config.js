const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('./storage.config');

// Auth
//router.post('/login', authController);


// Users
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser)
router.get('/users/:id', authMiddleware.isAuthenticated, usersController.getUser)
router.post('/users', usersController.create);


module.exports = router;