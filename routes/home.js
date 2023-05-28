const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// renderiza a pagina principal com todos o produtos
router.get('/', homeController.homeindex);

//Ao clicar em algum dos botoes de categoria do menu renderiza uma rota padronizada que trás 
//todos os produtos que possuem suas subcategorias assoaciadas a aquela determinada categoria
router.get('/category/:id', homeController.categoryProducts);

//Trás produtos com dados compativeis com a pesquisa do usuario.
router.get('/search', homeController.searchProducts);


module.exports = router;