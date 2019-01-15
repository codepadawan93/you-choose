import React, { Component } from "react";
import BreadcrumbArea from "./BreadcrumbArea";
import FloatingActionButton from "./FloatingActionButton";
import {Link} from "react-router-dom";
import { request, methods } from  "../helpers/HttpHelper";

class UserList extends Component {
  BASE_URL = "/api/users/";
  ERROR_TIMEOUT = 5000;
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      items: [],
      errors: [],
      messages: []
    };
  }
  render() {
    return (
      <div className="col-md-11">
      { this.showErrors() } 
      <BreadcrumbArea />
      <FloatingActionButton icon="fa-plus" type="warning" to="/admin/users/add"/>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.renderItems() }
          </tbody>
        </table>
      </div>
    );
  }
  
  async componentDidMount(){
    try{
      const res = await fetch(this.BASE_URL);
      const json = await res.json();
      if(json.success){
        this.setState({items: json.data});
      }
    } catch (e) {
      this.setErrors([e.toString()]);
    }
  }

  renderItems = () => {
    return this.state.items.map((item, itemKey) => {
      return (
        <tr key={itemKey}>
          <td>{item.user_id}</td>
          <td>{item.user_name}</td>          
          <td>{item.firstname}</td>
          <td>{item.lastname}</td>
          <td>{item.role_id}</td>
          <td>{item.createdAt}</td>
          <td>{item.updatedAt}</td>
          <td>
            <Link to={`/admin/users/${item.user_id}`} className="btn btn-warning btn-item text-white">
              <i className="fa fa-edit"></i>
            </Link>
            <button className="btn btn-danger btn-item text-white" onClick={e => this.handleDeleteItem(item.user_id)}>
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  handleDeleteItem = id => {
    if(window.confirm(`Are you sure you want to delete item ${id}`)){
      this.setState({ 
        items: this.state.items.filter(item => item.user_id !== id) 
      });
      request(this.BASE_URL + id, methods.DELETE);
    };
  }

  setErrors = errors => {
    this.setState({ errors });
    setTimeout(this.resetErrors, this.ERROR_TIMEOUT);
  }

  resetErrors = () => {
    this.setState({ errors: []});
  }

  showErrors = () => {
    return this.state.errors.map((error, itemKey) => {
      return (
        <div className="alert alert-danger floating-message col-md-11" role="alert" key={itemKey}>
          {error}
        </div>
      );
    })
  }
}

export default UserList;
