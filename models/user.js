'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: DataTypes.NUMBER,
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    role_id: DataTypes.NUMBER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};