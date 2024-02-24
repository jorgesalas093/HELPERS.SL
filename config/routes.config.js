const router = require('express').Router();

const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');
const chatsController = require("../controllers/chats.controles")
const messageControler = require("../controllers/message.controller");

const authMiddleware = require('../middlewares/auth.middleware');

const upload = require('./storage.config');

// Auth
router.post('/login', authController.login);


// Users
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser)
router.get('/users/:id', authMiddleware.isAuthenticated, usersController.getUser)
router.post('/users', usersController.create);


//Message
router.post('/message/:chatId', authMiddleware.isAuthenticated, messageControler.create);
router.get('/message', authMiddleware.isAuthenticated, messageControler.getCurrentUserMessageById)

//CHAT
router.get('/chats/:chatId', authMiddleware.isAuthenticated, chatsController.getCurrentUserChats)
router.post('/chats/:userId', authMiddleware.isAuthenticated, chatsController.createChat)

module.exports = router;