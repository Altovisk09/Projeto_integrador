module.exports = (sequelize, DataTypes) =>{
    const Usuario =sequelize.define('Usuario', {
        usuario_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            auto_increment:true,
            unique: true
        },
        usuario:{
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        nome:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        sobrenome:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        genero:{
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        data_de_nascimento:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        cpf:{
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true
        },
        telefone:{
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },
        email:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        senha:{
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        pedidos:{
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: true
        },
        
    },{
        tableName:'usuario',
        timestamps: false
    })
    return Usuario;
}