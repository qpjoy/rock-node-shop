const User = require('../models/user');
const bcrypt = require('bcrypt');
exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedin)
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isAuthenticated
    })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let userFound = null;
    User.findOne({email : email})
    .then(user => {
        if(!user){
            return res.redirect('/login')
        }
        userFound = user
        return user.verifyPassword(password)        
    })
    .then(validLogin => {
        if(validLogin){
            req.session.isLoggedin = true;
            req.session.user = userFound;
            req.session.save(err => {
                return res.redirect('/');
            })
        }
        else {
            return res.redirect('/login');
        }
        
    })
    .catch(err => {
        console.log(err)
        return res.redirect('/login');
    })
    
}

exports.postLogout = (req, res, next) => {
    console.log('logout user')
    req.session.destroy(() => {
        res.redirect('/');
    })
}

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/singup',
        pageTitle: 'Signup',
        isAuthenticated: req.session.isAuthenticated
    })
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email: req.body.email})
    .then(userDoc => {
        if(userDoc){
            return res.redirect('/signup');
        }
        const newUser = new User({
            email: email,
            password: password,
            cart: { items: [] }
        })
        return newUser.save();
    })
    .then(result => {
        res.redirect('/login')
    })
    .catch(err => {
        console.log(err)
    })
}