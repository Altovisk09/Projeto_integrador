const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const loadMenuData = require('../middlewares/subMenu');

router.use(loadMenuData);


// renderiza a pagina principal com todos o produtos
router.get('/', homeController.homeindex);

//Ao clicar em algum dos botoes de categoria do menu renderiza uma rota padronizada que trás 
//todos os produtos que possuem suas subcategorias assoaciadas a aquela determinada categoria
router.get('/category/:id', homeController.categoryProducts);

//Trás produtos com dados compativeis com a pesquisa do usuario.
router.get('/search', homeController.searchProducts);

//A partir do id do produto pegamos todos os seus dados e enviamos para uma view padronizada
router.get('/products/:id', homeController.getProduct);

module.exports = router;