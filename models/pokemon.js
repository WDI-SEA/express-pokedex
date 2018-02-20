'use strict';
module.exports = (sequelize, DataTypes) => {
  var pokemon = sequelize.define('pokemon', {
    name: DataTypes.STRING,
    customName: DataTypes.STRING,
    notes: DataTypes.STRING,
    type: DataTypes.STRING,
    habitat: DataTypes.STRING,
    characteristic: DataTypes.INTEGER,
    eggGroup: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {});
  pokemon.associate = function(models) {
    // associations can be defined here
  };
  return pokemon;
};