const { Produto } = require('../models/index');

const testeController = {
  findProducts: async (req, res) => {
    try {
      // Consulta ao banco de dados para obter os produtos
      const produtos = await Produto.findAll();

      // Exibe os produtos no console
      console.log(produtos);

      res.render('teste');
    } catch (error) {
      console.error('Erro ao obter os produtos:', error);
      res.status(500).send('Erro ao obter os produtos');
    }
  }
};

module.exports = testeController;
