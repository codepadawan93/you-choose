"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          user_name: "admin",
          password:
            "$2b$05$.YmzkysZdk.iqm8T69xLLeHXqil8DE1YTk6/bHVTk1OUq9nC5hQ/y",
          firstname: "Admin",
          lastname: "Istrator",
          role_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
