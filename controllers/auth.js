exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedin)
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login'
    })
}

exports.postLogin = (req, res, next) => {
    req.session.isLoggedin = true;
    res.redirect('/')
}

exports.postLogout = (req, res, next) => {
    console.log('logout user')
    req.session.destroy(() => {
        res.redirect('/');
    })
}