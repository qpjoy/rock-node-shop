exports.getLogin = (req, res, next) => {
    console.log(req.get('Cookie'))
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login'
    })
}

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedin=true');
    res.redirect('/')
}