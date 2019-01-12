import React, { Component } from "react";
import BreadcrumbArea from "./BreadcrumbArea";

class ListList extends Component {
  render() {
    return (
      <div className="col-md-11">
      <BreadcrumbArea />
      <table className="table table-striped">
        <thead>
          <tr>
          <th>List id</th>
          <th>User</th>
          <th>Personal rating</th>
          <th>Created at</th>
          <th>Updated at</th>
        </tr>
        </thead>
      </table>
      </div>
    );
  }
}
export default ListList;
