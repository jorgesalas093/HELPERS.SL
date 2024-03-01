const router = require('express').Router();

const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');
const chatsController = require("../controllers/chat.controles")
const messageControler = require("../controllers/message.controller");
const commentController = require("../controllers/comment.controler");


const authMiddleware = require('../middlewares/auth.middleware');

const upload = require('./storage.config');

// Auth
router.post('/login', authController.login);


// Users
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser)
router.get('/users/:id', authMiddleware.isAuthenticated, usersController.getUser)
router.post('/users', usersController.create);
router.get('/users', usersController.getAllJobsUsers);
//de aqui puedo pillarlo por el params que me viene por la ruta del front, toca hacer la logica del controler para que lo pille por cada uno de los tipos de trabajo 
router.get('/users/jobs/:typejob', usersController.getJobsByType);


//Message
router.post('/message/:chatId', authMiddleware.isAuthenticated, messageControler.create);
router.get('/message', authMiddleware.isAuthenticated, messageControler.getCurrentUserMessageById)

//CHAT
router.get('/chats/:chatId', authMiddleware.isAuthenticated, chatsController.getCurrentUserChats)
router.post('/chats/:userId', authMiddleware.isAuthenticated, chatsController.createChat)

//COMMENTS
router.get('/comment/:userId', authMiddleware.isAuthenticated, commentController.getComment)
router.post('/comment/:userId', authMiddleware.isAuthenticated, commentController.createComment)

//LIKES BY RATE

//componente de react mapbox


module.exports = router;