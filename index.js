// include the express module
var express = require("express");

// keeps track of whether or not a user is logged in
var loggedIn = false;

// create an express application
var app = express();

// helps in extracting the body portion of an incoming request stream
//var bodyparser = require('body-parser');

// fs module - provides an API for interacting with the file system
var fs = require("fs");

// helps in managing user sessions
var session = require('express-session');

app.use(session({
  secret: "medical-img",
  saveUninitialized: true,
  resave: false}
));

app.use(express.static(__dirname + '/Medical_Imaging_Code_Base'));

// server listens on heroku port or port 9999 for incoming connections
let port = process.env.PORT;
if (port == null || port == "") {
  port = 9999;
}
app.listen(port);


// Default page for app is home page
app.get('/',function(req, res) {

	res.sendFile(__dirname + '/Medical_Imaging_Code_Base/html/Home.html');

});

//routes user to Login page on clicking train
app.get('/login',function(req, res) {

	res.sendFile(__dirname + '/Medical_Imaging_Code_Base/html/Login.html');

});

// work around for current lack of a true login session thing
app.get('/train',function(req, res) {
	if(req.session.loggedIn){
		res.sendFile(__dirname + '/Medical_Imaging_Code_Base/html/Train.html');
	}
	else{
		res.sendFile(__dirname + '/Medical_Imaging_Code_Base/html/Disclaimer.html');
	}
});

// About Us page
app.get('/aboutUs',function(req, res) {

	res.sendFile(__dirname + '/Medical_Imaging_Code_Base/html/AboutUs.html');

});

// FAQ page
app.get('/faqs',function(req, res) {

	res.sendFile(__dirname + '/Medical_Imaging_Code_Base/html/FAQs.html');

});

// Create Account Page
app.get('/createAccountPage',function(req, res) {

	res.sendFile(__dirname + '/Medical_Imaging_Code_Base/html/CreateAccount.html');

});

// Information Page
app.get('/information',function(req, res) {

	res.sendFile(__dirname + '/Medical_Imaging_Code_Base/html/Information.html');

});

// Settings page
app.get('/settings',function(req, res) {

	res.sendFile(__dirname + '/Medical_Imaging_Code_Base/html/Settings.html');

});

// Progress page
app.get('/progress',function(req, res) {

	res.sendFile(__dirname + '/Medical_Imaging_Code_Base/html/Progress.html');

});

app.get('/logout', function(req, res) {
	req.session.destroy();
	res.redirect('/login');
});


// Post response for when a user submits the create account form
app.post('/postLogin', function(req, res) {
	req.session.loggedIn = 1;
    res.redirect('/train');

});

app.use(express.static(__dirname + '/Medical_Imaging_Code_Base/assets'));
