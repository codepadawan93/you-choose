import React, { Component } from "react";
import BreadcrumbArea from "./BreadcrumbArea";

class RoleList extends Component {
  render() {
    return (            
      <div className="col-md-11">
      <BreadcrumbArea />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rode ID</th>
            <th>Role Name</th>
            <th>Created at</th>
            <th>Updated at</th>
          </tr>
        </thead>
      </table>
      </div>
    );
  }
}
export default RoleList;
