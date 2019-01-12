import React, { Component } from "react";

class RoleForm extends Component {
  render() {
    return (
      <div>
        <input type="number" value="role_id" readonly />
        <input type="text" value="role_name" required />
        <input type="button" id="submit_button" name="submit" />
        <input type="button" id="save_button" name="save" />
        <input type="button" id="back_button" name="back" />
        <input type="button" id="delete_button" name="delete" />
      </div>
    );
  }
}
export default RoleForm;
