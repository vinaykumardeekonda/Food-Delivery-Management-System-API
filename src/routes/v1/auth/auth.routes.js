const express = require('express');
const router = express.Router();
const AuthModule = require('../../../controllers/auth/auth.controllers');
const productController = require('../../../controllers/auth/auth.product');
const { checkUser } = require('../../../middleware/auth'); 
const authCtrl = new AuthModule();

router.use(express.json());

router.post('/registration', async (req, res) => {
    return await authCtrl.register(req, res)
});

router.post('/login', (req, res) => authCtrl.login(req, res));

router.get('/details', checkUser, async (req, res) => await authCtrl.details(req, res));

router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
