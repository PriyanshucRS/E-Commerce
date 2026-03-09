const express = require('express');
const router = express.Router()
const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middleware/auth.middleware')

router.post('/add', authMiddleware, cartController.addToCart)
router.get('/', authMiddleware, cartController.getCart); 


module.exports = router;