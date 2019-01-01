// Make sure to require your models in the files where they will be used.

var db = require('./models');

db.pdex.create({
	name: 'Ivysaur'
}).then(function(poke) {
	console.log('Created: ', poke.name);
});


// db.pdex.findAll().then(function(poke) {
// 	console.log('Found first: ', poke[0].name);
// 	console.log('Found unspecific: ', poke.name);
// 	console.log('found poke object: ', poke);

// });

db.pdex.findAll().then(function(poke) {
	poke.forEach(function(poke) {
		console.log('found:', poke.id, ' ', poke.name);
	});
});