const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

const notLogged = require('../middlewares/notLogged')

router.get('/',notLogged, userController.userIndex);
router.get('/logout',notLogged, userController.logout);




module.exports = router;