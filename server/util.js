var Utilities = {

  ensureAuthenticated: function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
    return next(); }
  res.redirect('/signin');
}

};


module.exports = Utilities;