const { Usuario } = require('../models/index');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const loginController = {
  index: (req, res) => {
    res.render('login');
  },
  indexRegister: (req, res) => {
    res.render('register');
  },
  createLogin: (req, res) => {
  if (req.body) {
      // O arquivo foi enviado corretamente
      Usuario.create({
        usuario: req.body.usuario,
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        genero: req.body.genero,
        data_de_nascimento: req.body.data_de_nascimento,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        email: req.body.email,
        senha: req.body.senha,
      })
        .then(() => {
          console.log('Usuário criado com sucesso');
          res.redirect('/login');
        })
        .catch((error) => {
          console.error('Erro ao criar usuário:', error);
        });
    } else {
      console.error('Arquivo não enviado corretamente');
    }
  },
};

module.exports = loginController;
