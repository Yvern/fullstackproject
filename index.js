const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

/*
* Require all models for the database
*/
require('./models/User');
require('./models/Event');
require('./models/Squad');
require('./services/passport');
require('./services/scheduler');

/*
* Require all routes for the app
*/
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const squadRoutes = require('./routes/squadRoutes');
const mailRoutes = require('./routes/mailRoutes');
const keys = require('./config/keys');

//connect to the MongoDB database using Mongoose
mongoose.connect(keys.mongoURI);

//Initialise express to handle routing and allow for a port to be set up on
//which to listen for requests
const app = express();

//allow JSON to be parsed
app.use(bodyParser.json());

/*
 * Tells the server to use cookies
 * maxAge: max time the cookie last
 */
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
//instructs the app instance to use Passport
app.use(passport.initialize());
app.use(passport.session());

//bind routes to the Express app
authRoutes(app);
eventRoutes(app);
squadRoutes(app);
mailRoutes(app);

//Check if the environment is set to production or development
if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assests, e.g. main.js / main.css
  app.use(express.static('client/build'));

  //Express will serve up index.html if the route is not recognised
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

/*
 * Allows Heroku to inject environment variable PORT for dynamic PORT binding
 * Then listen on that PORT for requests
 * Alternatively, if no PORT is injected, use port 5000
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT);
