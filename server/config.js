var express = require('express');
var app = express();
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var router = express.Router();
var authenticated = express.Router();

module.exports = function(app, exprses){
app.use(express.static(__dirname + '/../client'));
app.use('/', router);
app.use('/account', authenticated);

router.get('/signin', function(req, res){
  res.sendFile('signin.html', {root: __dirname + '/../client'});
});

authenticated.get('/account', function(req, res){
  res.sendFile('account.html', {root: __dirname + '/../client'});
});

authenticated.use(function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/signin');
});
}






// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authenticating, Google will redirect the
//   user back to this application at /auth/google/return
router.get('/auth/google', 
  passport.authenticate('google', { failureRedirect: '/signin' }),
  function(req, res) {
    res.redirect('/');
  });

// GET /auth/google/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/return', 
  passport.authenticate('google', { failureRedirect: '/signin' }),
  function(req, res) {
    console.log('hello');
    res.redirect('/account');
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});


// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/../client'));
app.use('/', router);
app.use('/account', authenticated);

router.get('/signin', function(req, res){
  res.sendFile('signin.html', {root: __dirname + '/../client'});
});


authenticated.get('/account', function(req, res){
  res.sendFile('account.html', {root: __dirname + '/../client'});
});

authenticated.use(function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/signin');
});


// app.all("/*", function(req, res, next) {
//     res.sendFile("index.html", {root: __dirname + '/../client'});
// });