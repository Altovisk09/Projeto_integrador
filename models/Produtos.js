module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    produto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome_produto: {
      type: DataTypes.STRING(100)
    },
    descricao: {
      type: DataTypes.TEXT
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2)
    },
    imagem: {
      type: DataTypes.STRING(255)
    },
    qtd_estoque: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'produtos',
    timestamps: false
  });

  Produto.associate = (models) => {
    Produto.belongsTo(models.Subcategoria, { foreignKey: 'subcategoria_id', as: 'subcategoria' });
  };

  return Produto;
};
