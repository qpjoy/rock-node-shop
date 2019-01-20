const router = require('express').Router();
const isAuth = require('../middlewares/auth');
const AdminController = require('../controllers/admin')

router.get('/add-product', isAuth, AdminController.getAddProduct)

router.get('/products', isAuth ,AdminController.getProducts)

router.post('/add-product', isAuth,AdminController.postAddProduct)

router.get('/edit-product/:id', isAuth, AdminController.getEditProduct)

router.post('/edit-product/', isAuth, AdminController.postEditProduct)

router.post('/delete-product/:id', isAuth, AdminController.postDeleteProduct)

exports.router = router

