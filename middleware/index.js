const checkAuth = (req, res, next) => {
  console.log(req.session);
  if (req.session.userId) {
    return next();
  } 
  res.redirect('./login');
}

module.exports = { checkAuth };