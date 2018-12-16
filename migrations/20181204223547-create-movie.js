"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movie_id: {
        type: Sequelize.INTEGER
      },
      tmdb_guid: {
        type: Sequelize.INTEGER
      },
      budget: {
        type: Sequelize.FLOAT
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
        type: Sequelize.FLOAT
      },
      poster_path: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.STRING
      },
      revenue: {
        type: Sequelize.FLOAT
      },
      runtime: {
        type: Sequelize.FLOAT
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
        type: Sequelize.FLOAT
      },
      vote_count: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable("Movies");
  }
};
