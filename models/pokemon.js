'use strict';
module.exports = (sequelize, DataTypes) => {
  const pokemon = sequelize.define('pokemon', {
    name: DataTypes.STRING,
  }, {});
  pokemon.associate = function(models) {
 // pokemon.hasMany(models.pokemon,{
 //        foreignKey: 'pokemonId',
 //        as: 'pokemon',
 //    }); 
  };
  return pokemon;
};