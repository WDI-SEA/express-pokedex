'use strict';
module.exports = (sequelize, DataTypes) => {
  var poke = sequelize.define('poke', {
    name: DataTypes.STRING
  }, {});
  poke.associate = function(models) {
    // associations can be defined here
  };
  return poke;
};