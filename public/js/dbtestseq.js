var Sequelize = require('sequelize');
var sequelize = new Sequelize('pokedex', null , null, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize
.authenticate()
.then(function(err){
  console.log("Success");
})
.catch(function(err){
  console.log(err);
});
