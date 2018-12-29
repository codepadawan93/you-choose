import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import UserList from "./components/UserList";
import RoleList from "./components/RoleList";
import ListList from "./components/ListList";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <Router>
          <div>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/admin" component={Sidebar} />
            <Route exact path="/admin/" component={Dashboard} />
            <Route exact path="/admin/users" component={UserList} />
            <Route exact path="/admin/roles" component={RoleList} />
            <Route exact path="/admin/lists" component={ListList} />
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
