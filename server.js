// modules =================================================
var express        = require('express');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var path     	   = require('path');
var methodOverride = require('method-override');
var logger 		   = require('morgan');
var personas       = require('./app/routes/personas');
var app            = express();

// configuration ===========================================

// config files
var db = require('./config/db');
//connection to db
mongoose.connect(db.url, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

var port = process.env.PORT || 3000; // set our port

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(path.join(__dirname,'public'))); // set the static files location /public/img will be /img for users
app.use(logger('dev'));

// routes ==================================================
app.use('/api/personas', personas);

//frontend
var path = require('path');
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname,'public','index.html'));
});

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app