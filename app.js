const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const ErrorController = require('./controllers/error')
const sequelize = require('./util/database')
const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')
const User = require('./models/user')
const Product = require('./models/product')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop.js')
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'public')))

app.use((req, res, next) => {
    User.findByPk(1)
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
app.use(ErrorController.get404)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })
Product.belongsToMany(Order, { through: OrderItem })
sequelize
// .sync({
//     force: true
// })
.sync()
.then(result => {
    return User.findByPk(1)
})
.then(user => {
    if(!user){
        return User.create({
            name: 'Gil',
            'email': 'gil@mail.com'
        });
    }
    return user;
})
.then(user => {
    user.getCart().then( cart => {
        if(!cart){
            return user.createCart();
        }
        return cart;
    })
})
.then(cart => {
    app.listen(port, () => {
        console.log(`Server listening at port: ${port}`)
    })
})
.catch(err => {
    console.log(err)
})
