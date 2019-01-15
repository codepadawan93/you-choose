"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_name: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        len: [8, 21]
      },
      firstname: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      role_id: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false
      },
      session_id: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
