'use strict';
const { Model } = require('sequelize');
const sequelize = require('./index');

module.exports = (sequelize, DataTypes) => {
  class pokemon extends Model {
    static associate(models) {
      // define association here
    }
  }
  pokemon.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'pokemon',
  });
  
  // Export the `pokemon` model
  return pokemon;
};

