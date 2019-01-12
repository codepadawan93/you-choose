import React, { Component } from "react";
import BreadcrumbArea from "./BreadcrumbArea";

class UserList extends Component {
  render() {
    return (
      <div className="col-md-11">
      <BreadcrumbArea />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>          
              <th>First name</th>
              <th>Last name</th>
              <th>Role</th>
              <th>Created at</th>
              <th>Updated at</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    );
  }
}
export default UserList;
