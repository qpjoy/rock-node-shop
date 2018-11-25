const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ErrorController = require('./controllers/error');
const mongoose = require('mongoose')
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');


const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop.js')
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

// app.use((req, res, next) => {
//     User.findById("5bfa31ec93639f4d1467cc14")
//     .then(user => {
//         req.user = new User(user.name, user.email, user.cart, user._id);
//         console.log(req.user)
//         next();
//     })
//     .catch(err => {
//         console.log(err);
//     })
// })

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