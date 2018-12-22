"use strict";
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    "Movie",
    {
      movie_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      tmdb_guid: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false
      },
      budget: {
        type: DataTypes.FLOAT
      },
      genres: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      homepage: {
        type: DataTypes.STRING
      },
      imdb_id: {
        type: DataTypes.STRING
      },
      original_language: {
        type: DataTypes.STRING
      },
      overview: {
        type: DataTypes.TEXT,
        required: true,
        allowNull: false
      },
      popularity: {
        type: DataTypes.FLOAT
      },
      poster_path: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      release_date: {
        type: DataTypes.STRING
      },
      revenue: {
        type: DataTypes.FLOAT
      },
      runtime: {
        type: DataTypes.FLOAT
      },
      status: {
        type: DataTypes.STRING
      },
      tagline: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      vote_average: {
        type: DataTypes.FLOAT
      },
      vote_count: {
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  Movie.associate = function(models) {
    // associations can be defined here
  };
  return Movie;
};
