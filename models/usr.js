'use strict';
module.exports = (sequelize, DataTypes) => {
  const usr = sequelize.define('usr', {
    name: DataTypes.STRING,
    img: DataTypes.STRING
  }, {});
  usr.associate = function(models) {
    // associations can be defined here
  };
  return usr;
};