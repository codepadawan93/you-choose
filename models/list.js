"use strict";
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    "List",
    {
      list_id: {
        allowNull: false,
        primaryKey: true,
        required: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      personal_rating: {
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  List.associate = function(models) {
    // associations can be defined here
  };
  return List;
};
