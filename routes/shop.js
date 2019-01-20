const router = require('express').Router();
const isAuth = require('../middlewares/auth');
const ShopController = require('../controllers/shop');

router.get('/', ShopController.getIndex);

router.get('/products', ShopController.getProducts);

router.get('/products/:id', ShopController.getProduct);

router.get('/cart', isAuth, ShopController.getCart);

router.post('/cart', isAuth, ShopController.postCart);

router.post('/cart-delete-item', isAuth, ShopController.postCartDeleteProduct);

router.post('/create-order', isAuth,ShopController.postOrder)

router.get('/orders', isAuth, ShopController.getOrders);

// router.get('/checkout', ShopController.getCheckout);


module.exports = router;