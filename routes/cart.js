const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController')

router.get('/', cartController.cartIndex);
router.get('/address', cartController.addressIndex);
module.exports = router;
