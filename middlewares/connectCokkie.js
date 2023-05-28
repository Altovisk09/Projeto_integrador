function setCookie(req, res, next) {
  if (req.body.checkbox) {  
    res.cookie('logMail', req.body.user, { maxAge: 1000 * 60 * 60 });
  }
  next()
}

module.exports = setCookie;
