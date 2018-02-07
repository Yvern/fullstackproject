/*
 * Middleware function to check login status, next is a callback function
 */
module.exports = (req, res, next) => {
  //if no user is logged in, send back response and break middleware chain
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }
  //else, if user is logged in, execute the next request
  next();
};
