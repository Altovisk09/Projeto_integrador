function notLogged(req, res, next){
    if(!req.session.usuarioLogado){
        return res.redirect('/login')
    }
    next()
}

module.exports= notLogged