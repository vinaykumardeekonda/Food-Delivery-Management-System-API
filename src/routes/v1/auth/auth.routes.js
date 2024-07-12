const express = require('express');
const router = express.Router();
const AuthModule = require('../../../controllers/auth/auth.controllers');
const productController = require('../../../controllers/auth/auth.product');
const cartController = require('../../../controllers/auth/auth.cart');
const { checkUser } = require('../../../middleware/auth'); 
const authCtrl = new AuthModule();

router.use(express.json());
// login registration routes
router.post('/registration', async (req, res) => {
    return await authCtrl.register(req, res)
});

router.post('/login', (req, res) => authCtrl.login(req, res));

router.get('/details', checkUser, async (req, res) => await authCtrl.details(req, res));
// Products routes
router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Cart routes
router.post('/cart', cartController.addItemToCart);
router.delete('/cart/:userId/:productId', cartController.removeItemFromCart);
router.put('/cart/:userId/:productId', cartController.updateItemQuantity);
router.post('/cart/:userId', cartController.getUserCart);

module.exports = router;
