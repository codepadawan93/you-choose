'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    movie_id: DataTypes.NUMBER,
    tmdb_guid: DataTypes.INTEGER,
    budget: DataTypes.NUMBER,
    genres: DataTypes.STRING,
    homepage: DataTypes.STRING,
    imdb_id: DataTypes.STRING,
    original_language: DataTypes.STRING,
    overview: DataTypes.TEXT,
    popularity: DataTypes.NUMBER,
    poster_path: DataTypes.STRING,
    release_date: DataTypes.STRING,
    revenue: DataTypes.NUMBER,
    runtime: DataTypes.NUMBER,
    status: DataTypes.STRING,
    tagline: DataTypes.STRING,
    title: DataTypes.STRING,
    vote_average: DataTypes.NUMBER,
    vote_count: DataTypes.NUMBER
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
  };
  return Movie;
};