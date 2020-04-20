'use strict';
module.exports = (sequelize, DataTypes) => {
  const pokedex = sequelize.define('pokedex', {
    name: DataTypes.STRING
  }, {});
  pokedex.associate = function(models) {
    // associations can be defined here
  };
  return pokedex;
};
