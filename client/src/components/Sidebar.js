import React, { Component } from "react";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <Link to="/admin/">Start Bootstrap</Link>
          </li>
          <li>
            <Link to="/admin/">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/users">Users</Link>
          </li>
          <li>
            <Link to="/admin/roles">Roles</Link>
          </li>
          <li>
            <Link to="/admin/lists">Lists</Link>
          </li>
        </ul>
      </div>
    );
  }
}
export default Sidebar;
