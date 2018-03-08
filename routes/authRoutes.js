const passport = require('passport');

module.exports = app => {
  /*
 * Handle an incoming request to /auth/google by responding with PassportJS
 */
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  /*
 * Handle the callback after permission is given to access the google account
 * Redirect to the 'surveys' page
 */
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  /*
   *
   */
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  /*
   * Prints out the current logged in user as saved in the cookies
   */
  app.get('/api/current_user', (req, res) => {
    if (req.user) {
      res.send(req.user);
    } else {
      res.send(false);
    }
  });
};
