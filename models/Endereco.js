

module.exports = (sequelize, DataTypes) => {
    const Usuario = require('./Usuario');
    const Address = sequelize.define('Address', {
      endereco_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      logradouro: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      complemento: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cep: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bairro: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cidade: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      estado: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },{
        tableName:'endereco',
        timestamps: false
    });
  
    Address.associate = (models) => {
      Address.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
    };
  
    return Address;
};
