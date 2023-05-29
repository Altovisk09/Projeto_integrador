const { Usuario } = require('../models/index');
const { Op } = require('sequelize');

const userController = {
    userIndex: (req, res) => {
      res.render('profile', {
        usuarioLogado: req.session.usuarioLogado,
      });
    },
    logout: (req, res) => {
      req.session.destroy(),
      res.clearCookie('logMail')
      return res.redirect('/')
    },
    pedidos: (req, res) => {
      // Lógica para exibir os pedidos do usuário
      res.render('pedidos', {
        usuarioLogado: req.session.usuarioLogado,
      });
    },
    privacy: (req, res) => {
      // Lógica para exibir as configurações de privacidade do usuário
      res.render('privacy', {
        usuarioLogado: req.session.usuarioLogado,
      });
    },
    dados: (req, res) => {
        // Lógica para gerenciar os dados pessoais do usuário
        const usuarioLogado = req.session.usuarioLogado;
      
        res.render('dados', {
          usuarioLogado: usuarioLogado,
        });
      },
      deleteAccount: async (req, res) => {
        let userId;
      
        // Verifica se há um usuário na sessão
        if (req.session && req.session.usuarioLogado) {
          userId = req.session.usuarioLogado.usuario_id;
        }
      
        // Se não houver usuário na sessão, verifica o cookie
        if (!userId && req.cookies && req.cookies.logId) {
          userId = req.cookies.logId;
        }
      
        try {
          if (!userId) {
            console.log('Usuário não encontrado na sessão ou no cookie.');
            return res.redirect('/profile');
          }
      
          // Exclui o usuário com base no ID
          await Usuario.destroy({
            where: { usuario_id: userId }
          });
      
          // Limpa a sessão e o cookie após a exclusão
          req.session.destroy();
          res.clearCookie('logId');
          res.clearCookie('logMail');
      
          return res.redirect('/');
        } catch (error) {
          console.error('Erro ao excluir a conta do usuário:', error);
          // Lógica de tratamento de erro, redirecionamento ou resposta adequada
          return res.redirect('/profile');
        }
      },
      
      
    };
    
    module.exports = userController;