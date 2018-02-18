'use strict';

module.exports = (sequelize, DataTypes) => { //pu

  var pokemon = sequelize.define('pokemon', { //setting pokemon
    name: DataTypes.STRING
  }, {});
  pokemon.associate = function(models) {
    // associations can be defined here
  };
  return pokemon; //return data pulled from selected object = name only
};
