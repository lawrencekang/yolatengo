module.exports = function(app, passport){


app.get('/', function(req, res){
  res.sendFile('index.html', {root: __dirname + '/../client'});
});

app.get('/account', function(req, res){
  res.sendFile('account.html', {root: __dirname + '/../client'});
});

app.get('/signin', function(req, res){
   res.sendFile('signin.html', {root: __dirname + '/../client'});
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authenticating, Google will redirect the
//   user back to this application at /auth/google/return
app.get('/auth/google', 
  passport.authenticate('google', { failureRedirect: '/signin' }),
  function(req, res) {
    res.redirect('/');
  });

// GET /auth/google/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/return', 
  passport.authenticate('google', { failureRedirect: '/signin' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


}