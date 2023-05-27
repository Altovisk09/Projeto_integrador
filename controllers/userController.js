const userController = {
    userIndex:(req, res) =>{
        res.render('profile',{
            usuarioLogado: req.session.usuarioLogado
        })
    },
    logout: (req, res) =>{
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = userController;