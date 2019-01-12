import React, { Component } from "react";

class UserForm extends Component {
  render() {
    return (
      <div>
        <input type="number" id="user_id" name="user_id" />
        <input type="text" id="user_name" name="username" />
        <input type="text" id="firstname" name="firstname" />
        <input type="text" id="lastname" name="lastname" />
        <select id="role" name ="role">
            <option value="1">Admin</option>
            <option value="2">Normal user</option>
        </select>
        <input type="text" id="created_at" name="created_at"/>
        <input type="text" id="updated_at" name="updated_at"/>
      </div>
    );
  }
}
export default UserForm;
