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

var discogs = new Discogs({userToken: 'sWYaOjigCOMuqPmqDAoBZdzwvuDULDQZTTRbGlkJ'}).database();

app.get('/', function(req, res){
	res.render('index');
});

app.get('/covet/:id', function(req, res){
	var artistId = req.params.id;
	discogs.getRelease(artistId).then(function(data){
		var year = data.year;
		var artists = [];
		for(var i = 0; i<data.artists.length; i++){
			artists.push(data.artists[i].name);
		}
		artists = artists.toString();
		var image = data.thumb;
		var trackList = [];
		for(var i = 0; i<data.tracklist.length; i++){
			trackList.push(data.tracklist[i].title + " (" + data.tracklist[i].duration + ")");
		}
		trackList = trackList.toString()
		var formats = [];
		for(var i = 0; i<data.formats.length; i++){
			formats.push(data.formats[i].name);
		}
		formats = formats.toString();
		db.myList.create({
			artist: artists,
			year: year,
			imageUrl: image,
			trackList: trackList,
			formats: formats,
			listType: 'covet'
		});
	});
	res.redirect('/covet');
});

app.get('/covet', function(req, res){
	db.myList.findAll({ where: { listType: 'covet' } }).then(function(result){
  		res.render('covet',{ covetList: result});
	});	
});

app.get('/hoard/:id', function(req, res){
	var artistId = req.params.id;
	discogs.getRelease(artistId).then(function(data){
		var year = data.year;
		var artists = [];
		for(var i = 0; i<data.artists.length; i++){
			artists.push(data.artists[i].name);
		}
		artists = artists.toString();
		var image = data.thumb;
		var trackList = [];
		for(var i = 0; i<data.tracklist.length; i++){
			trackList.push(data.tracklist[i].title + " (" + data.tracklist[i].duration + ")");
		}
		trackList = trackList.toString()
		var formats = [];
		for(var i = 0; i<data.formats.length; i++){
			formats.push(data.formats[i].name);
		}
		formats = formats.toString();
		db.myList.create({
			artist: artists,
			year: year,
			imageUrl: image,
			trackList: trackList,
			formats: formats,
			listType: 'hoard'
		});
	});
	res.redirect('/hoard');
});

app.get('/hoard', function(req, res){
	db.myList.findAll({ where: { listType: 'hoard' } }).then(function(result){
  		res.render('hoard',{ hoardList: result});
	});	
});

// app.get('/swaptohoard/:dbId', function(req, res){
// 	var databaseId = req.params.dbId;

// 		db.myList.create({
// 			artist: artists,
// 			year: year,
// 			imageUrl: image,
// 			trackList: trackList,
// 			formats: formats,
// 			listType: 'hoard'
// 		});
// 	});
// 	res.redirect('/hoard');
// });


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
				db.bootleg.create({
					artistName: artistInfo.title,
					discogsId: artistInfo.id,
					imageUrl: artistInfo.thumb,
					searchCount: 1
				});
			}
		}	

		res.render('results', { releases: releases, artistInfo: artistInfo, artistId: artistId });
	});	
});



//this is how we separate our routes into separate files
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
