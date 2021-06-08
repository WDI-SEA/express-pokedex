'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('pokemons', 'dexnum', {
        type: Sequelize.INTEGER,
        allowNull: false,
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('pokemons', 'dexnum')])
  }
};
