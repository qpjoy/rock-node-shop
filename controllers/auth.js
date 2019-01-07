const User = require('../models/user');
exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedin)
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isAuthenticated
    })
}

exports.postLogin = (req, res, next) => {
    User.findById('5bfb1bad935d1a2f0a836583')
    .then(user => {
        req.session.user = user;
        req.session.isAuthenticated = true;
        res.redirect('/')
    })
    
}

exports.postLogout = (req, res, next) => {
    console.log('logout user')
    req.session.destroy(() => {
        res.redirect('/');
    })
}