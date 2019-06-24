require('dotenv').config();
const express = require('express');
//to front
const app = express();
const layout = require('express-ejs-layouts');
const override = require('method-override');
const axios = require('axios');
const PORT = process.env.PORT || 3000;
//to database
const db = require('./models');

//to front
app.set('view engine', 'ejs');
app.use(layout);
app.use(override('_method'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));
app.use(require('morgan')('dev'));


//routes  ========================================================
//* GET /  
//todo 1. render a list of pokemon before 151. 20 per page? each with link to each individual pokemmon
//todo 2. a link to the favorate pokemon list (/pokemon)
//todo with fav button and indication on each one

app.get('/', function(req, res) {
  let favList =[];
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

    let pageid = 1;
    res.render('index', { favList, favIDList }); //? pass in {pokemons, pageid}
  });
});



// import all routes from .routes/pokemon.js check for more details
app.use('/pokemon', require('./routes/pokemon'));  //* checked all routes work fine


//? test route =====================================================
app.get('/test', function(req, res){

  db.user.findAll({
    attributes:['name', 'pokemon_id']
  }).then(function(list){
    res.send(list);
  })
})





//port =========================================
app.listen(PORT, function() {
  console.log('Port 3000 is connected.');
});
