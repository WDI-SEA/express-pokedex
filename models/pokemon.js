'use strict';
module.exports = (sequelize, DataTypes) => {
  const pokemon = sequelize.define('pokemon', {
    name: DataTypes.STRING
  }, {});
  pokemon.associate = function(models) {
    // associations can be defined here
    // pokemons.hasMany(models.pokemon,{
    // 	foreignKey: 'pokemonId',
    // 	as: 'pokemons',
    // });
  };
  return pokemon;
};