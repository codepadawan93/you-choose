import React, {Component} from "react";
import { Route, Redirect, Switch } from "react-router-dom";
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
import { getCookie } from "../helpers/CookieHelper";

class Admin extends Component {
    AUTH_URL = "/api/authenticate/";
    constructor(){
        super();
        this.state = {
            currentUser: null,
            shouldRedirect: false,
            redirectTo: "/"
        };
    }

    render(){
        return (
            <div>
                { this.state.shouldRedirect ? <Redirect to={this.state.redirectTo}/> : null }
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

    componentWillMount = async () => {
        const apiToken = getCookie("api_token");
        
        if(apiToken !== ""){
          const res = await fetch(this.AUTH_URL + encodeURIComponent(apiToken));
          const json = await res.json();
          
          if(json.success){
            if(json.data.role_id !== 1){
                this.setState({ shouldRedirect: true });
            }
            this.setState({ ...this.state, currentUser: json.data });
          } else {
            this.setState({ shouldRedirect: true });
          }
        } else {
            this.setState({ shouldRedirect: true });
        }
      }
}

export default Admin;