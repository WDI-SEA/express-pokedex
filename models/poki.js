'use strict';
module.exports = (sequelize, DataTypes) => {
  const poki = sequelize.define('poki', {
    name: DataTypes.STRING
  }, {});
  poki.associate = function(models) {
    // associations can be defined here
  };
  return poki;
};