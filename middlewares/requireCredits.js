/*
 * Middleware function to check login status, next is a callback function
 */
module.exports = (req, res, next) => {
  //if no user is logged in, send back response and break middleware chain
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits!' });
  }
  //else, if user is logged in, execute the next request
  next();
};
