'use strict';
module.exports = (sequelize, DataTypes) => {
  const poke = sequelize.define('poke', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    img: DataTypes.STRING
  }, {});
  poke.associate = function(models) {
    // associations can be defined here
  };
  return poke;
};