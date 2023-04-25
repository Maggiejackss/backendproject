const checkAuth = () => {
  if (req.session.userId) {
    return next();
  } 
  res.redirect('./login');
}

module.exports = { checkAuth };