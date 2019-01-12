import React, { Component } from "react";

class ListForm extends Component {
  render() {
    return (
      <div>
        <input type="number" id="list_id" name="lidt ID" readonly />
        <input type="text" placeholder="Search.." />
        <input type="button" id="submit_button" name="submit" />
        <input type="button" id="save_button" name="save" />
        <input type="button" id="back_button" name="back" />
        <input type="button" id="delete_button" name="delete" />
      </div>
    );
    
  }
}
export default ListForm;
