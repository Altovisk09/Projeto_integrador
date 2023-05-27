  const { Usuario } = require('../models/index');
  const { Op } = require('sequelize');
  const fs = require('fs');
  const path = require('path');
  const { validationResult } = require('express-validator');
  const bcrypt = require('bcrypt');


  const loginController = {
    indexLogin: (req, res) => {
      res.render('login', {
        errors: {},
      });
    },
      processLogin: (req, res) => {
        let resultValidationlog = validationResult(req);
      
        if (resultValidationlog.errors.length > 0) {
          return res.render('login', {
            errors: resultValidationlog.mapped(),
            oldData: req.body // Passa os dados do formulário de volta para a view
          });
        } else {
          // Autenticação bem-sucedida, redirecionar para a página principal
          res.redirect('/profile')
        }
      },

    indexRegister: (req, res) => {
      res.render('register', {
        errors: {},
      })
    },
    createLogin: (req, res) => {
    let senhaC = bcrypt.hashSync(req.body.senha, 10)
    let resultValidation = validationResult(req)
    
    if (resultValidation.errors.length > 0) {
      return res.render('register', {
        errors: resultValidation.mapped(),
        oldData: req.body // Passa os dados do formulário de volta para a view
      });
    }
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
          senha: senhaC
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
