
var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.poke.findAll()
  .then((poke)=> {
  		res.render('pokemon/index', { poke });
  })
  .catch((err) => {
  	console.log('err', err)
  	res.send('error dude')
  })
  
});

router.post('/', (req,res)=>{
  console.log(req.body)
  db.poke.create(req.body)
  .then((createPoke)=> {
    res.redirect('/pokemon/' + createPoke.name)
  })
  .catch((err)=> {
    console.log('Error in POST / poke', err)
    res.render('404')
  })
})

router.get('/pokemon/:id', (req, res)=>{

  db.poke.findOne({
    where:{ id: req.params.id }

    })
  .then (foundPoke=>{
    res.render('pokemon/displayFav', {favePoke: foundPoke})


  })
  .catch(err=>{
    console.log('caught an error',err)
    res.send('caught an error')
  })
})



router.get('/:name', (req, res) => {
  
  //calling the details of the pokemon
  var iChooseUrl = 'http://pokeapi.co/api/v2/pokemon/'+ req.params.name + '/';
  console.log("api call url: ",iChooseUrl)

  // Use request to call the API
  request(iChooseUrl, function(error, response, body) {
       chosenPokemon = JSON.parse(body);
      // console.log("HEY CHOSENPOKE: ",chosenPokemon)
      res.render('pokemon/show', {poke: chosenPokemon})
    })
})

router.put('/pokemon', (req, res)=>{
  //an example
  var newData = {
    name: req.body.name,
    nickname: req.body.nickname,
    level: req.body.level
  }

  db.poke.update(newData, { where: {id: req.body.id}})
  .then(updatedFave=>{
    console.log("updated", updatedFave.nickname)
    res.redirect('/pokemon/pokemon/'+req.body.id)
  })
})


router.delete('/', (req, res)=>{
  db.poke.destroy({
    where: req.body
  })
  .then(deletedPokemon=>{
    console.log(deletedPokemon.name, "has been released")
    res.redirect('/pokemon')
  })
})



module.exports = router;
