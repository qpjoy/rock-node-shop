const router = require('express').Router();
const AuthController = require('../controllers/auth');

router.get('/login', AuthController.getLogin);

router.post('/login', AuthController.postLogin);

router.get('/signup', AuthController.getSignup);

router.post('/signup', AuthController.postSignup);

router.post('/logout', AuthController.postLogout);

router.get('/reset', AuthController.getReset);

router.post('/reset', AuthController.postReset);

module.exports = router;