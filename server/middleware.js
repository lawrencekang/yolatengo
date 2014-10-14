var util = require('./util');

module.exports = function(app){

app.use('/account', util.ensureAuthenticated);

};