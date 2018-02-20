'use strict';

module.exports = function(sequelize, DataTypes) {
  var pokemon = sequelize.define('pokemon', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nickname: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {});
  pokemon.associate = function(models) {
    // associations can be defined here
  };
  return pokemon;
}
