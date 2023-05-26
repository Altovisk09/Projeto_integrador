const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const { check } = require('express-validator')

router.get('/', loginController.index);
router.get('/register', loginController.indexRegister);


  
router.post('/register', loginController.createLogin)

module.exports = router;