function userLogged(req, res, next){
    if(req.session.usuarioLogado){
        return res.redirect('/profile')
    }
    next()
}

module.exports= userLogged