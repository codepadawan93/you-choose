"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Movies", {
      movie_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tmdb_guid: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
      },
      budget: {
        type: Sequelize.FLOAT
      },
      genres: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
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
        type: Sequelize.TEXT,
        required: true,
        allowNull: false
      },
      popularity: {
        type: Sequelize.FLOAT
      },
      poster_path: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
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
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
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
