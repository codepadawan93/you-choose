"use strict";
module.exports = (sequelize, DataTypes) => {
  const ListItem = sequelize.define(
    "ListItem",
    {
      list_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      movie_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      personal_rating: DataTypes.INTEGER
    },
    {}
  );
  ListItem.associate = function(models) {
    // associations can be defined here
  };
  return ListItem;
};
