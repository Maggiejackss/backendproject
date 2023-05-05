const checkAuth = (req, res, next) => {
  console.log(req.session);
  /* `if (req.session.userId)` is checking if the `userId` property exists in the `req.session` object.
  If it does exist, it means that the user is authenticated and the middleware function allows the
  request to proceed to the next middleware function or route handler. If it does not exist, the
  middleware function redirects the user to the login page. */
  if (req.session.userId) {
    return next();
  } 
  res.redirect('./login');
}

module.exports = { checkAuth };

// const verifyPrevious = (req, res, next) => {
//   console.log(req.session);
//   if (req.session.)
// }