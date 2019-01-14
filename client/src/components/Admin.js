import React, {Component} from "react";
import { Route, Link, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import SidebarToggle from "./SidebarToggle";
import UserList from "./UserList";
import RoleList from "./RoleList";
import ListList from "./ListList";
import Error404 from "./Error404";
import UserForm from "./UserForm";
import RoleForm from "./RoleForm";
import ListForm from "./ListForm";


class Admin extends Component {
    constructor(){
        super();
    }
    render(){
        return (
            <div>
                <div id="wrapper">
                <div className="row">
                <Route path="/admin" component={Sidebar} />
                <Route path="/admin" component={SidebarToggle} />
                <Switch>
                    <Route exact path="/admin/" component={Dashboard} />
                    <Route exact path="/admin/users" component={UserList} />
                    <Route exact path="/admin/roles" component={RoleList} />
                    <Route exact path="/admin/lists" component={ListList} />

                    <Route path="/admin/users/:id" component={UserForm} />
                    <Route path="/admin/roles/:id" component={RoleForm} />
                    <Route path="/admin/lists/:id" component={ListForm} />

                    <Route component={Error404} />
                </Switch>
                </div>
            </div>
          </div>
        );
    }
}

export default Admin;