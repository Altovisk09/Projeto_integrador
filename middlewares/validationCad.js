const { body } = require('express-validator');
const { Usuario } = require('../models/index');

let validations = [
  body('usuario')
    .notEmpty().withMessage('Insira um nick para o usuário').bail()
    .isLength({ max: 15 }).withMessage('Máximo de caracteres permitidos (15)')
    .custom(async (value) => {
      const usuario = await Usuario.findOne({ where: { usuario: value } });
      if (usuario) {
        throw new Error('O usuário já está em uso');
      }
      return true;
    }),

  body('email')
    .notEmpty().withMessage('Insira um email').bail()
    .isEmail().withMessage('Insira um formato de email válido')
    .custom(async (value) => {
      const email = await Usuario.findOne({ where: { email: value } });
      if (email) {
        throw new Error('O email já está em uso');
      }
      return true;
    }),

  body('telefone')
    .notEmpty().withMessage('Insira seu número para contato').bail()
    .isLength({ max: 11, min: 10 }).withMessage('Insira um número válido')
    .custom(async (value) => {
      const telefone = await Usuario.findOne({ where: { telefone: value } });
      if (telefone) {
        throw new Error('O número de telefone já está em uso');
      }
      return true;
    }),

  body('cpf')
    .notEmpty().withMessage('Insira seu CPF').bail()
    .isLength({ max: 11, min: 11 }).withMessage('Insira um CPF válido')
    .custom(async (value) => {
      const cpf = await Usuario.findOne({ where: { cpf: value } });
      if (cpf) {
        throw new Error('O CPF já está em uso');
      }
      return true;
    }),

  body('nome').notEmpty().withMessage('Insira seu nome'),
  body('sobrenome').notEmpty().withMessage('Insira seu sobrenome'),
  body('data_de_nascimento').notEmpty().withMessage('Insira sua data de nascimento'),
  body('senha').notEmpty().withMessage('Insira uma senha').bail()
    .isLength({ min: 6 }).withMessage('Sua senha deve ter no mínimo 6 caracteres'),

    body('pass2')
    .notEmpty().withMessage('Confirme sua senha')
    .custom((value, { req }) => {
      if (value !== req.body.senha) {
        throw new Error('As senhas não coincidem');
      }
      return true;
    }),
];

module.exports = validations;
