const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ErrorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user');
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');


const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop.js');
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) => {
    User.findById("5bfb1bad935d1a2f0a836583")
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    })
})

app.use('/admin', adminData.router)
app.use(shopRoutes)
app.use(ErrorController.get404);



mongoose.connect('mongodb://localhost:27017/nodeshop', { useNewUrlParser: true })
.then(db => {
   
    app.listen(port, () => {
        console.log(`Server listening at port: ${port}`);
    })
})
.catch(err => console.log('err'))