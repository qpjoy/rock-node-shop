const router = require('express').Router();
const isAuth = require('../middlewares/auth');
const { body } = require('express-validator/check');
const AdminController = require('../controllers/admin')

router.get('/add-product', isAuth, AdminController.getAddProduct)

router.get('/products', isAuth ,AdminController.getProducts)

router.post('/add-product', [
    body('title').isString().isLength({min: 3}).trim(),
    body('price').isFloat(),
    body('imageUrl').isURL(),
    body('description').trim().isLength({min: 5, max: 400})
],isAuth,AdminController.postAddProduct)

router.get('/edit-product/:id', isAuth, AdminController.getEditProduct)

router.post('/edit-product/', [
    body('title').isString().isLength({min: 3}).trim(),
    body('price').isFloat(),
    body('imageUrl').isURL(),
    body('description').trim().isLength({ min: 5, max: 400 })
], isAuth ,AdminController.postEditProduct)

router.post('/delete-product/:id', isAuth, AdminController.postDeleteProduct)

exports.router = router

