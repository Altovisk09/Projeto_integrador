  const { body } = require('express-validator');
  const { Usuario } = require('../models/index');
  const { Op } = require('sequelize');
  const bcrypt = require('bcrypt');
  

  const validationsLog = [
    body('user')
      .notEmpty().withMessage('Insira seu email ou nome de usuário')
      .custom(async (value) => {
        const usuario = await Usuario.findOne({
          where: {
            [Op.or]: [
              { email: value },
              { usuario: value }
            ]
          }
        });
        if (!usuario) {
          throw new Error('O email ou nome de usuário não está cadastrado');
        }
        return true;
      }),

    body('pass')
      .notEmpty().withMessage('Insira sua senha')
      .custom(async (value, { req }) => {
        const usuario = await Usuario.findOne({
          where: {
            [Op.or]: [
              { email: req.body.user },
              { usuario: req.body.user }
            ]
          }
        });
        if (!usuario) {
          throw new Error('As credenciais não estão corretas');
        }
        const senhaCorreta = bcrypt.compareSync(value, usuario.senha);
        
        if (!senhaCorreta) {
          throw new Error('As credenciais não estão corretas');
        }

        // Excluir a senha do objeto do usuário
    delete usuario.dataValues.senha;

    // Excluir o _previousDataValues do objeto do usuário
    delete usuario._previousDataValues;

    // Salvar apenas os dados do usuário (exceto senha e _previousDataValues) na sessão
    req.session.usuarioLogado = usuario.get({ plain: true });



        return true;
      })
  ];

  module.exports = validationsLog;
