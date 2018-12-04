'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    user_id: DataTypes.INTEGER,
    movie_id: DataTypes.INTEGER,
    personal_rating: DataTypes.INTEGER
  }, {});
  List.associate = function(models) {
    // associations can be defined here
  };
  return List;
};