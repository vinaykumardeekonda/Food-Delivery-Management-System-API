const express = require('express');
const router = express.Router();
const AuthModule = require('../../../controllers/auth/auth.controllers');
const { checkUser } = require('../../../middleware/auth'); // import to checkUser
const authCtrl = new AuthModule();

// Middleware to parse JSON request bodies
router.use(express.json());

router.post('/registration', async (req, res) => {
    return await authCtrl.register(req, res)
});

router.post('/login', (req, res) => authCtrl.login(req, res));

router.get('/details', checkUser, async (req, res) => await authCtrl.details(req, res));

module.exports = router;
