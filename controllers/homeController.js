const { Categoria, Produto, Subcategoria} = require('../models/index');
const { Op } = require('sequelize');

const homeController = {
  homeindex: async (req, res) => {
    try {
      const produtos = await Produto.findAll();
      res.render('home', { produtos });
    } catch (error) {
      console.error('Erro ao obter os produtos:', error);
      res.status(500).send('Erro ao obter os produtos');
    }
  },
  categoryProducts: async (req, res) => {
    const categoriaId = req.params.id;

    try {
      // Consulta ao banco de dados para obter os produtos da categoria
      const categoria = await Categoria.findByPk(categoriaId, {
        include: {
          model: Subcategoria,
          as: 'subcategorias',
          include: {
            model: Produto,
            as: 'produtos'
          }
        }
      });

      if (!categoria) {
        return res.status(404).send('Categoria não encontrada');
      }

      const produtos = categoria.subcategorias.flatMap((subcategoria) => subcategoria.produtos);

      // Renderiza a view 'category' e passa os produtos como variável para a view
      res.render('category', { produtos });
    } catch (error) {
      console.error('Erro ao obter os produtos da categoria:', error);
      res.status(500).send('Erro ao obter os produtos da categoria');
    }
  },
  searchProducts: async (req, res) => {
    const searchTerm = req.query.searchTerm;

    try {
      const produtos = await Produto.findAll({
        where: {
          [Op.or]: [
            {
              descricao: {
                [Op.like]: `%${searchTerm}%`
              }
            },
            {
              nome_produto: {
                [Op.like]: `%${searchTerm}%`
              }
            }
          ]
        }
      });

      const semResultados = produtos.length === 0;

      res.render('searchResults', { produtos: produtos, semResultados: semResultados });
    } catch (error) {
      console.error('Erro ao pesquisar produtos:', error);
      res.status(500).send('Erro ao pesquisar produtos.');
    }
  }
};

module.exports = homeController;
