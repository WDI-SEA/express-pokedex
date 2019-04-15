'use strict';
module.exports = (sequelize, DataTypes) => {
  const poke = sequelize.define('poke', {
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    level: DataTypes.INTEGER
  }, {});
  poke.associate = function(models) {
    // associations can be defined here
  };
  return poke;
};