var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var Discogs = require('disconnect').Client;
var db = require('./models');
var $ = require('jQuery')

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);



app.get('/', function(req, res){
	res.render('index');
});

var discogs = new Discogs({userToken: 'sWYaOjigCOMuqPmqDAoBZdzwvuDULDQZTTRbGlkJ'}).database();


//gets artistId from search bar on any page and renders results page
app.post( '/',function(req, res){
	var artist = req.body.search;
	var artistInfo;
	var artistId;
	var releases = [];
	discogs.search('type=artist' && artist).then(function(data){
		artistId = data.results[0].id;
		for(var i = 0; i<data.results.length; i++){
			if(data.results[i].type==='release'){
				releases.push(data.results[i]);
				releases.sort(function(a,b){
					if (a.year < b.year) {
  						return 1;
  					}
  					if (a.year > b.year) {
    					return -1;
  					}
				});
			} else if (data.results[i].type==='artist'){
				artistInfo = data.results[i];
			}
		}	
		res.render('results', { releases: releases, artistInfo: artistInfo, artistId: artistId });
	});	
});



//this is how we separate our routes into separate files
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
