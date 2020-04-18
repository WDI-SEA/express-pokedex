'use strict';
module.exports = (sequelize, DataTypes) => {
  const pokemon = sequelize.define('pokemon', {
    name: DataTypes.STRING,
    nickName: DataTypes.STRING,
    level: DataTypes.INTEGER,
    maxHp: DataTypes.INTEGER,
    currentHp: DataTypes.INTEGER
  }, {});
  pokemon.associate = function(models) {
    // associations can be defined here
  };
  return pokemon;
};