'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movie_id: {
        type: Sequelize.NUMBER
      },
      tmdb_guid: {
        type: Sequelize.INTEGER
      },
      budget: {
        type: Sequelize.NUMBER
      },
      genres: {
        type: Sequelize.STRING
      },
      homepage: {
        type: Sequelize.STRING
      },
      imdb_id: {
        type: Sequelize.STRING
      },
      original_language: {
        type: Sequelize.STRING
      },
      overview: {
        type: Sequelize.TEXT
      },
      popularity: {
        type: Sequelize.NUMBER
      },
      poster_path: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.STRING
      },
      revenue: {
        type: Sequelize.NUMBER
      },
      runtime: {
        type: Sequelize.NUMBER
      },
      status: {
        type: Sequelize.STRING
      },
      tagline: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      vote_average: {
        type: Sequelize.NUMBER
      },
      vote_count: {
        type: Sequelize.NUMBER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Movies');
  }
};