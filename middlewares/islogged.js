function estaLogado(req, res, next){
    res.locals.isLogged = false;

    if(req.session.usuarioLogado){
        res.locals.isLogged = true
    }
    next()
}

module.exports = estaLogado;