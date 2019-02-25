const User = require('../models/user');
const router = require('express').Router();
const { check, body } = require('express-validator/check');
const AuthController = require('../controllers/auth');

router.get('/login', AuthController.getLogin);

router.post('/login', [
    check('email')
    .isEmail()
    .withMessage('Please enter a valid emaill')
    .normalizeEmail(),
    check('password').isLength({ min: 5 }).withMessage('Your password must be at least 5 characters').trim()

], AuthController.postLogin);

router.get('/signup', AuthController.getSignup);

router.post('/signup', [
    check('email').isEmail().withMessage('Please enter a valid email')
    .normalizeEmail()
    .custom((value, {req}) => {
        return User.findOne({email: value})
        .then(userDoc => {
            if(userDoc){
                return Promise.reject('E-mail exists already, please pick a different one.')
            }
        })
    }),
    body('password', 'Password needs to has at least 5 characteres').isLength({ min: 5}).isAlphanumeric().trim(),
    body('confirmPassword').custom((value, {req}) => {
        if(value !== req.body.password){
            console.log('VALUES: ', value, req.body.password)
            throw new Error('Passwords have to match!')
        }
        return true;
    })
], AuthController.postSignup);

router.post('/logout', AuthController.postLogout);

router.get('/reset', AuthController.getReset);

router.post('/reset', AuthController.postReset);

router.get('/reset/:token', AuthController.getResetPassword);

router.post('/reset-password', AuthController.postResetPassword);

module.exports = router;