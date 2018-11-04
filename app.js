const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressHbs = require('express-handlebars')
const app = express()
app.engine('hbs', expressHbs())
app.set('view engine', 'hbs')
app.set('views', 'views')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop.js')
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'public')))

app.use('/admin', adminData.router)
app.use(shopRoutes)
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle : 'Not Found'})
})
app.listen(port, () => {
    console.log(`Server listening at port: ${port}`)
})