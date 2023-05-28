module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    categoria_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome_categoria: {
      type: DataTypes.STRING(100)
    }
  }, {
    tableName: 'categorias',
    timestamps: false
  });

  Categoria.associate = (models) => {
    Categoria.hasMany(models.Subcategoria, { foreignKey: 'categoria_id', as: 'subcategorias' });
  };

  return Categoria;
};
