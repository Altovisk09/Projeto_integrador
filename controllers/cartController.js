const cartController = {
    cartIndex:(req, res)=>{
        res.render('cart')
    },
    addressIndex:(req, res)=>{
        res.render('address')
    }
}

module.exports = cartController;