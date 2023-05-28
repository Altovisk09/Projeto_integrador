const { Usuario } = require('../models/index');

async function estaLogado(req, res, next) {
  res.locals.isLogged = false;

  if (req.session.usuarioLogado) {
    res.locals.isLogged = true;
    return next();
  }

  const emailCookie = req.cookies.logMail;

  if (emailCookie) {
    const usuario = await Usuario.findOne({ where: { email: emailCookie } });
    if (usuario) {
      req.session.usuarioLogado = usuario;
      res.locals.isLogged = true;
    } else {
      console.log('Nenhum usuário encontrado com o email do cookie');
    }
  }

  next();
}

module.exports = estaLogado;
