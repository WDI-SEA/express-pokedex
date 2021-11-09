const express = require('express');
const router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) =>{
  db.pokemon.findAll()
      .then(faves => {
          res.render('faves', {results: faves})
      })
      .catch (error =>{
          console.error
      })
})


//POST ROUTE that will save a fave

router.post('/', (req, res)=>{
  const data = JSON.parse(JSON.stringify(req.body))
  console.log('This is data', data)

  db.pokemon.create({
      name: data.name,
  })
  .then(createdFave => {
      console.log('db instance created: \n', createdFave)
      // res.redirect(`pokemon/${createdFave.id}`
      res.redirect('/pokemon')
  })
  .catch(error => {
      console.error
  })
})

// DELETE ROUTE to remove a fave
router.delete('/:id', (req, res) => {
  // console.log('this is the id\n', req.params.id)
  db.pokemon.destroy({
      where: {id: req.params.id}
  })
  .then(deletedItem =>{
      // console.log('you deleted:', deletedItem)
      res.redirect('/pokemon')
  })
  .catch(error =>{
      console.error
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});


// SHOW ROUTE for individual fave
// if youre using a req param (:id in this case) make sure youre more
// specific URLs are above the one using the parameter
router.get('/:id', (req, res) => {
  console.log('this is the fave id \n', req.params.id)
  db.pokemon.findOne({
      where: {id: req.params.id}
  })
  .then (foundFave => {
      res.render('showFave', {
          name: foundFave.name,
          weight: foundFave.weight,
          img : foundFave.base_experience,
          date: foundFave.createdAt,
      })
  })
  .catch (error => {
      console.error
  })
})

module.exports = router;
