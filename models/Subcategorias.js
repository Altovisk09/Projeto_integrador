module.exports = (sequelize, DataTypes) => {
  const Subcategoria = sequelize.define('Subcategoria', {
    subcategoria_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome_subcategoria: {
      type: DataTypes.STRING(100)
    }
  }, {
    tableName: 'subcategorias',
    timestamps: false
  });

  Subcategoria.associate = (models) => {
    Subcategoria.belongsTo(models.Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
    Subcategoria.hasMany(models.Produto, { foreignKey: 'subcategoria_id', as: 'produtos' });
  };

  return Subcategoria;
};
