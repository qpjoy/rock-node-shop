const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ErrorController = require('./controllers/error');
const mongoose = require('mongoose');

const session = require('express-session');

const MongoDbSession = require('connect-mongodb-session')(session);

const User = require('./models/user');
const app = express();

const MONGODB_URI = 'mongodb://localhost:27017/nodeshop';

const store = new MongoDbSession({
    uri: MONGODB_URI,
    collection: 'sessions',
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const authRoutes = require('./routes/auth');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop.js');

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'my secrete', 
    resave: false, 
    saveUninitialized: false,
    store: store
}))
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) => {
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    });
})

app.use('/admin', adminData.router);
app.use(authRoutes);
app.use(shopRoutes);
app.use(ErrorController.get404);



mongoose
.connect(MONGODB_URI, { useNewUrlParser: true })
.then(db => {
    app.listen(port, () => {
        console.log(`Server listening at port: ${port}`);
    })
})
.catch(err => console.log('err'))