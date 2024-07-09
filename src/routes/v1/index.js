const express = require('express')
const router = express.Router()

router.use('/auth', require('./auth/auth.routes'))

module.exports = router