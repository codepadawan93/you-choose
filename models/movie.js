"use strict";
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    "Movie",
    {
      movie_id: DataTypes.INTEGER,
      tmdb_guid: DataTypes.INTEGER,
      budget: DataTypes.FLOAT,
      genres: DataTypes.STRING,
      homepage: DataTypes.STRING,
      imdb_id: DataTypes.STRING,
      original_language: DataTypes.STRING,
      overview: DataTypes.TEXT,
      popularity: DataTypes.FLOAT,
      poster_path: DataTypes.STRING,
      release_date: DataTypes.STRING,
      revenue: DataTypes.FLOAT,
      runtime: DataTypes.FLOAT,
      status: DataTypes.STRING,
      tagline: DataTypes.STRING,
      title: DataTypes.STRING,
      vote_average: DataTypes.FLOAT,
      vote_count: DataTypes.INTEGER
    },
    {}
  );
  Movie.associate = function(models) {
    // associations can be defined here
  };
  return Movie;
};
