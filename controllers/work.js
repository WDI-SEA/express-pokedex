router.get('/', function(req, res) {
  db.pokedex.findAll({
    order: 'name ASC' })
  .then(function(pokemon) {
    res.render('index.ejs', { pokemon: pokemon });
  })
  .catch(function(err){
    console.log(err);
    res.send("Doh Pokedex Server Error.")
  });
});


router.post('/', function(req, res){
  db.pokedex.create({
    name: req.body.name
  }).then(function(data){
    //You can now access newly created data
    if(data){
      res.status(200).redirect("/");
    }
    else {
      res.status(500).send("Server error");
    }
  });
});
