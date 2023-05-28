const Categoria = require('../models/index');
const Produto = require('../models/index');

// Controller para buscar produtos por categoria
async function buscarProdutosPorCategoria(req, res) {
  try {
    const categoriaId = req.params.id; // Obtém o ID da categoria a partir dos parâmetros da rota

    // Busca a categoria pelo ID
    const categoria = await Categoria.findById(categoriaId);

    // Verifica se a categoria foi encontrada
    if (categoria) {
      // Acessa as subcategorias da categoria encontrada
      const subcategorias = categoria.subcategorias;

      // Busca os produtos relacionados às subcategorias da categoria
      const produtos = await Produto.find({ subcategoria: { $in: subcategorias } });

      res.render('category', { produtos }); // Passa os produtos para a view como um array
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' }); // Retorna um erro 404 se a categoria não for encontrada
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos por categoria' }); // Retorna um erro 500 em caso de erro
  }
}

module.exports = {
  buscarProdutosPorCategoria
};
