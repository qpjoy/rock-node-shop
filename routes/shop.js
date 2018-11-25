const express = require('express');

const ShopController = require('../controllers/shop');

const router = express.Router();

router.get('/', ShopController.getIndex);

router.get('/products', ShopController.getProducts);

router.get('/products/:id', ShopController.getProduct);

// router.get('/cart', ShopController.getCart);

// router.post('/cart', ShopController.postCart);

// router.post('/cart-delete-item', ShopController.postCartDeleteProduct);

// router.post('/create-order', ShopController.postOrder)

// router.get('/orders', ShopController.getOrders);

// router.get('/checkout', ShopController.getCheckout);


module.exports = router;