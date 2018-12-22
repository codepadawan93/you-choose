"use strict";
module.exports = (sequelize, DataTypes) => {
  const ListItem = sequelize.define(
    "ListItem",
    {
      list_item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      list_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      movie_id: {
        allowNull: false,
        type: DataTypes.INTEGER
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
