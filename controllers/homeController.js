const { Categoria, Produto, Subcategoria } = require('../models/index');
const { Op } = require('sequelize');

const homeController = {
  homeindex: async (req, res) => {
    try {
      const page = req.query.page || 1;
      const limit = 20;
      const offset = (page - 1) * limit;
  
      const { count, rows: produtos } = await Produto.findAndCountAll({
        limit,
        offset
      });
  
      const totalPages = Math.ceil(count / limit);
      const totalProdutos = count;
      const currentPage = parseInt(page, 10);
  
      res.render('home', { produtos, totalPages, currentPage, searchUrl: req.originalUrl });
  
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
  },
  getProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Produto.findByPk(productId);

      if (!product) {
        return res.status(404).render('error', { message: 'Produto não encontrado' });
      }

      res.render('product', { product });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: 'Erro ao buscar informações do produto' });
    }
  },
  category: async (req, res) => {
    const categoryId = req.params.id;

    try {
      // Consulta ao banco de dados para obter as subcategorias relacionadas à categoria
      const categoria = await Categoria.findByPk(categoryId, {
        include: {
          model: Subcategoria,
          as: 'subcategorias'
        }
      });

      if (!categoria) {
        return res.status(404).send('Categoria não encontrada');
      }

      const subcategorias = categoria.subcategorias;

      // Renderiza a view 'category' e passa as subcategorias como variável para a view
      res.render('category', { subcategorias });
    } catch (error) {
      console.error('Erro ao obter as subcategorias da categoria:', error);
      res.status(500).send('Erro ao obter as subcategorias da categoria');
    }
  },
};

module.exports = homeController;
