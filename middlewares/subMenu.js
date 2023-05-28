const { Categoria, Subcategoria } = require('../models/index');

const loadMenuData = async (req, res, next) => {
  try {
    const categorias = await Categoria.findAll({
      include: {
        model: Subcategoria,
        as: 'subcategorias',
      },
    });

    res.locals.categorias = categorias;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar os dados do menu');
  }
};

module.exports = loadMenuData;
