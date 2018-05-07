const passport = require('passport');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('User');
const Event = mongoose.model('Event');
const Squad = mongoose.model('Squad');

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

  app.post('/api/delete_user', requireLogin, async (req, res) => {
    const user = req.body;
    console.log(user);
    try {
      let userToDelete = await User.findById(user._id);
      let squadsToDelete = await Squad.find({ _user: user._id });
      let eventsToDelete = await Event.find({ _user: user._id });

      eventsToDelete.forEach(event => {
        event.remove();
      });
      squadsToDelete.forEach(squad => {
        squad.remove();
      });
      userToDelete.remove();

      req.logout();
      res.send(null);
    } catch (err) {
      console.log(err);
      res.send(user);
    }
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
