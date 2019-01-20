const User = require('../models/user');
exports.getLogin = (req, res, next) => {
    let message = req.flash('error')

    if(message.length > 0){
        message = message[0]
    }
    else {
        message = null;
    }

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        message
    })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let userFound = null;
    User.findOne({email : email})
    .then(user => {
        
        if(!user){
            throw new Error('Email not exists');
        }
        userFound = user
        return user.verifyPassword(password)  
    })
    .then(validLogin => {
        console.log('validLogin', validLogin)
        if(validLogin){
            req.session.isAuthenticated = true;
            req.session.user = userFound;
            req.session.save(err => {
                return res.redirect('/');
            })
        }
        else {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        }
        
    })
    .catch(err => {
        console.log("ERROR -> ",err)
        req.flash('error', 'Invalid email or password');
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
    let message = req.flash('error')

    if (message.length > 0) {
        message = message[0]
    }
    else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/singup',
        pageTitle: 'Signup',
        message: message
    })
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email: req.body.email})
    .then(userDoc => {
        if(userDoc){
            req.flash('error', 'This email is already taken');
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