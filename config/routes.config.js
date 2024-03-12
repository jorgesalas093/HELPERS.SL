const router = require('express').Router();

const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');
const chatsController = require("../controllers/chat.controller")
const messageControler = require("../controllers/message.controller");
const commentController = require("../controllers/comment.controler");
const rateController = require("../controllers/rate.controller")

const authMiddleware = require('../middlewares/auth.middleware');

const upload = require('./storage.config');

// Auth
router.post('/login', authController.login);
router.get("/activate/:token", authController.activate);


//click outsite ----BUSCAR ESO PARA EL CHAT EN FRONT
// Users
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser)

router.get('/users/typesjob', authMiddleware.isAuthenticated, usersController.getEnumValues);
router.delete('/users/:id', authMiddleware.isAuthenticated, usersController.deleteCurrentUser)
router.get('/users/:id', authMiddleware.isAuthenticated, usersController.getUser)
router.post('/users', upload.single('avatar'), usersController.create);
router.get('/users', usersController.getAllJobsUsers);
router.get('/users/jobs/:typejob', usersController.getJobsByType);
router.put('/users/me', authMiddleware.isAuthenticated, usersController.editUser);



//Message
router.post('/message/:chatId', authMiddleware.isAuthenticated, messageControler.create);
router.get('/message', authMiddleware.isAuthenticated, messageControler.getCurrentUserMessageById)

//CHAT
router.get('/chats', authMiddleware.isAuthenticated, chatsController.allChats)
router.get('/chats/:chatId', authMiddleware.isAuthenticated, chatsController.getChat)
router.post('/chats/:userId', authMiddleware.isAuthenticated, chatsController.createChat)

//COMMENTS
router.get('/comment/:userId', authMiddleware.isAuthenticated, commentController.getComment)
router.post('/comment/:userId', authMiddleware.isAuthenticated, commentController.createComment)
router.delete('/comment/:commentId', authMiddleware.isAuthenticated, commentController.deleteComment)

//LIKES BY RATE
router.get('/rate/:receiverId', rateController.getRate);
router.post('/rate/:receiverId', authMiddleware.isAuthenticated, rateController.createRate);







module.exports = router;