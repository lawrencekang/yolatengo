var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var morgan = require('morgan');
var session = require('express-session');
var passportConfig = require('./passportConfig')(passport);

app = express();

app.use(session({ secret: 'keyboard cat', 
                  saveUninitialized: true,
                  resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '../client'));
app.use(morgan('short'));

var middleware = require('./middleware')(app);
var routes = require('./routes')(app, passport);


app.listen(3000);
