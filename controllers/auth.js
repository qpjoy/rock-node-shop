const crypto = require('crypto');
const User = require('../models/user');
const { validationResult } = require('express-validator/check')
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}))

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
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array())
        return res.status(422).render('auth/signup', {
            path: '/singup',
            pageTitle: 'Signup',
            message: errors.array()[0].msg
        })
    }
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
        return transporter.sendMail({
            to: email,
            from: 'node@mail.com',
            subject: 'NodeShop',
            html: `<h1>Welcome to the NodeShop:</h1>`
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
}
exports.getReset = (req, res, next) => {
    let message = req.flash('error')

    if (message.length > 0) {
        message = message[0]
    }
    else {
        message = null;
    }
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        message: message
    })
}

exports.postReset = (req, res, next) => {
    const email = req.body.email;
    crypto.randomBytes(32, (err, buffer) => {
        if(err){
            console.log(err)
            return res.redirect('/reset')
        }
        else {
            const token = buffer.toString('hex');
            User.findOne({email:email})
            .then(user => {
                if(!user){
                    req.flash('erro','No account with that email found.')
                    return res.redirect('/reset')
                }
                user.token = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            })
            .then(result => {
                res.redirect('/')
                transporter.sendMail({
                    from: 'node@mail.com',
                    to: email,
                    subject:'Password reset',
                    html: `
                        <p>You requested a password reset</p>
                        <p>${token}</p>
                        <p>Click this <a href='http://localhost:3000/reset/${token}'>link</a> to set a new password.</p>
                    `
                })
            })
            .catch(err => {
                console.log('err')
            })
        }
    })
}
exports.getResetPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({token: token})
    .then(user => {
        let message = req.flash('error')
        if (message.length > 0) {
            message = message[0]
        }
        else {
            message = null;
        }
        if(!user){
            return res.redirect('/login')
        }
        res.render('auth/new-password', {
            path: '/reset-password',
            pageTitle: 'Reset Password',
            message: message,
            userId: user._id.toString(),
            passwordToken: token
        })
    })
    .catch(err => {
        console.log(err)
    })
}
exports.postResetPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    User.findOne({
        _id: userId, 
        resetTokenExpiration: passwordToken,
        resetTokenExpiration: { $gt: Date.now() }})
    .then(user => {
        if(!user){
            req.flash('error','Token expired! try again!')
            return res.redirect(`/reset`)
        }
        user.password = newPassword;
        return user.save();
    })
    .then(result => {
        return res.redirect('/login')
    })
    .catch(err => {
        console.log(err)
    })
}