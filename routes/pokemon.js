var express = require('express');
var router = express.Router();
const axios = require('axios');
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  res.redirect('/page/1');
});

//* GET /page/:id
router.get('/page/:id', function(req, res) {
  let pageid = parseInt(req.params.id);
  let offset = pageid-1;
  console.log('This is page' + pageid);
  let pokeurl = 'https://pokeapi.co/api/v2/pokemon/?offset=' + offset + '&limit=20'
  console.log('get data from ' + pokeurl);
  

  axios.get(pokeurl).then(function(apires) {
    // console.log(apires.data.results);
    //* get more info from each pokemon page.
    getPokemonDetails(pageid, res, apires.data.results, 'pokemons');
    });
})

//* GET /fav/:id
router.get('/fav/:id', function(req, res) {
  let pageid = parseInt(req.params.id);
  let favList = [];
  let favIDList = [];
  let fakeAPIdata = [];

  db.user.findAll({
    attributes: ['name', 'pokemon_id']
  })
  .then(function(list) {
    // console.log(list);
    if (pageid > Math.ceil(list.length/20)) {
      res.redirect('/pokemon/fav/1');
    }
    
    list.forEach(function(item) {
      // console.log(item.name + ' is in favList.');
      favList.push(item.name);
      favIDList.push(item.pokemon_id);
      fakeAPIdata.push({
        name: item.name,
        url: "https://pokeapi.co/api/v2/pokemon/" + item.pokemon_id
      })
    });
    console.log('favlist is ' + favList);
    console.log('favID are ' + favIDList);
  }).then(function() {
    getPokemonDetails(pageid, res, fakeAPIdata, 'fav');
  });

  
  

  
})




// GET/pokemon/:id return a page with selected pokemon
router.get('/:id', function(req, res) {
  //todo: detailed info of selected pokemon
  //todo: fav button indicator
  //todo: link back to root and /pokemon
  let pokemon;
  let id = req.params.id;
  axios.get('https://pokeapi.co/api/v2/pokemon/'+ id)
  .then(function(apires) {
    pokemon = apires.data;
  })
  .then(function() {
    let favList = [];
    let favIDList = [];

    db.user.findAll({
      attributes: ['name', 'pokemon_id']
    })
    .then(function(list) {
      list.forEach(function(item) {
        favList.push(item.name);
        favIDList.push(item.pokemon_id);
      });
    }).then(function() {
      console.log('favList is '+ favList);
      res.render('pokemon', {pokemon, favList, favIDList});
    });
  })

})

//? GET /pokemon/test test pages ================================================
// router.get('/test', function(req, res){

//   db.user.find({
//     where: {
//       pokemon_id: 2
//     }
//   }).then(function(list){
//     res.send(list);
//   })
// })


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  console.log('add ' + req.body.name + ' to my fav list.' + req.body.pokemonid);
  db.user.create({
    name: req.body.name,
    pokemon_id: parseInt(req.body.pokemonid)
  })
  res.redirect(req.body.backlink);
});


// DELETE /pokemon/:id - remove a pokemon from fav list
router.delete('/:id', function(req, res) {
  //todo: remove select pokemon from fav list
  //todo: update fav indicator, redirect to (/pokemon/:id will auto update)
  db.user.destroy({
    where: {
      name: req.body.name
    }
  })
  res.redirect(req.body.backlink);
}) 


function getPokemonDetails(pageid, res, pokemons, ejs, index=0, details=[]) {
  if (pokemons.length === details.length) {
    return details;
  }
  console.log('pokemons are ' + pokemons[index]);
  
  let pokemon = pokemons[index];
  pokemon['id'];
  pokemon['img'] = '';
  pokemon['types'] = [];
  let favList = ['a', 'b', 'c'];
  let favIDList = [1,2,3];
  // console.log(pokemon);
  console.log('go to ' + pokemon.url);
  axios.get(pokemon.url).then(function(detail){
    // console.log(detail.data.sprites);
    detail = detail.data;
    // console.log(detail);
    pokemon.id =detail.id;
    pokemon.img = detail.sprites.front_default;
    detail.types.forEach(function(type) {
      pokemon.types.push(type.type.name);
    })
    details.push(pokemon);
    if (pokemons.length === details.length) {
      // console.log(details);
      let favList = [];
      let favIDList = [];

      db.user.findAll({
        attributes: ['name', 'pokemon_id']
      })
      .then(function(list) {
        // console.log(list);
        list.forEach(function(item) {
          // console.log(item.name + ' is in favList.');
          favList.push(item.name);
          favIDList.push(item.pokemon_id);
        });
        // console.log('favlist is ' + favList);
        // console.log('favID are ' + favIDList);
      }).then(function() {
        console.log('get all info, will render page!');
        res.render(ejs, {'pokemons':details, pageid, favList, favIDList});
        return details;
      });
    }
    index++;
    return getPokemonDetails(pageid, res, pokemons, ejs, index, details);
  })
}


module.exports = router;


