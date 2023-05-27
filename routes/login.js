const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

const validations = require('../middlewares/validationCad')
const validationsLog = require('../middlewares/validationLog')
const userLogged = require('../middlewares/authLogged')


//renderiza pagina de login
router.get('/', userLogged, loginController.indexLogin);

// processa login
router.post('/', validationsLog, loginController.processLogin)

// renderiza pagina cadastro
router.get('/register',userLogged, loginController.indexRegister);
  
// processa dados de cadastro
router.post('/register', validations, loginController.createLogin)




module.exports = router;