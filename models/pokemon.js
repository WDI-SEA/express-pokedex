'use strict';
module.exports = (sequelize, DataTypes) => {
  var pokemon = sequelize.define('pokemon', {
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    info: DataTypes.STRING,
    types: DataTypes.ARRAY(DataTypes.STRING),
    type: DataTypes.STRING,
    defense: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    health: DataTypes.INTEGER
  }, {});
  pokemon.associate = function(models) {
    // associations can be defined here
  };
  return pokemon;
};
