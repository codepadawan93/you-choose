import React, { Component } from "react";
import BreadcrumbArea from "./BreadcrumbArea";
import {Link, Redirect} from "react-router-dom";
import {methods, request} from "../helpers/HttpHelper";

class RoleForm extends Component {
  BASE_URL = "/api/roles/";
  ERROR_TIMEOUT = 5000;
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      isNew: this.props.match.params.id === "add",
      shouldRedirect: false,
      roleData: {
        id: this.props.match.params.id === "add" ? "" : this.props.match.params.id,
        name: ""
      }, 
      errors: [],
      messages: []
    }
  }

  render() {
    return (
      <div className="col-md-11">
        <BreadcrumbArea />
        <form className="col-md-8 offset-md-2">
          {this.showErrors()}
          {this.showMessages()}
          <div className="form-group row btn-group">
            <Link id="backButton" name="back" className="btn" to="/admin/roles">Back</Link>
          </div>
          <div className="form-group row">
            <label htmlFor="roleId" className="col-md-2 col-form-label">Role ID: </label>
            <div className="col-md-10">
              <input type="text" className="form-control" value={this.state.roleData.id} name="roleId" readOnly onChange={e => this.handleChange(e)}/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="name" className="col-md-2 col-form-label">Role Name: </label>
            <div className="col-md-10">
              <input type="text" className="form-control" value={this.state.roleData.name} onChange={e => this.handleChange(e)} name="name" required />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-2 btn-group">
              <button id="submitButton" name="submit" className="btn btn-warning" onClick={ e => this.handleSubmit(e)}>Submit</button>
              <button id="saveButton" name="save" className="btn" onClick={ e => this.handleSave(e)}>Save</button>
            </div>
            <div className="col-md-1 offset-md-8">
              {
                this.state.roleData.id === ""
                ? null
                : <button id="deleteButton" name="delete" className="btn btn-danger" onClick={ e => this.handleDelete(e)}>Delete</button>
              }
            </div>
          </div>
        </form>
        { this.state.shouldRedirect ? <Redirect to='/admin/roles' /> : null }
      </div>
    );
  }

  componentDidMount = () => {
    if(!this.state.isNew)
      this.populateRole();
  }

  populateRole = async () => {
    const res = await fetch(this.BASE_URL + this.state.roleData.id);
    const json = await res.json();
    if(json.success){
      const currentRole = json.data[0];
      this.setState({
        roleData: {
          id: currentRole.role_id,
          name: currentRole.role_name
        }, 
      });
    }
  }

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({ roleData: {...this.state.roleData, [name] : value}})
  }

  handleSubmit = async e => {
    e.preventDefault();
    if(this.validateRole()){
      const {id, name} = this.state.roleData;
      const method = id === "" ? methods.POST : methods.PATCH;
      try {
        const res = await request(this.BASE_URL + id, method, {role_id: id, role_name: name});
        const data = await res.json();
        if(data.success){
          this.setMessages(["Successfully updated!"]);
        }
        this.setState({shouldRedirect: true});
      } catch (e){
        this.setErrors([e.toString()]);
      }
    }
  }

  handleSave = async e => {
    e.preventDefault();
    if(this.validateRole()){
      const {id, name} = this.state.roleData;
      try {
        const method = id === "" ? methods.POST : methods.PATCH;
        const res = await request(this.BASE_URL + id, method, {role_id: id, role_name: name});
        const data = await res.json();
        if(data.success){
          this.setMessages(["Successfully updated!"]);
        }
      } catch (e){
        this.setErrors([e.toString()]);
      }
    }
  }

  handleDelete = async e => {
    e.preventDefault();
    if(window.confirm(`Are you sure you want to delete role ${this.state.roleData.name}?`)){
      const {id, name} = this.state.roleData;
      try {
        const res = await request(this.BASE_URL + id, methods.DELETE);
        const data = await res.json();
        this.setState({shouldRedirect: true});
      } catch (e){
        this.setErrors([e.toString()]);
      }
    }
  }

  validateRole = () => {
    const {id, name} = this.state.roleData;
    let errors = [];
    let valid = true;
    if(name === null || name === ""){
      errors.push("Name must be specified!");
      valid = false;
    }
    this.setErrors(errors);
    return valid;
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
        <div className="alert alert-danger" role="alert" key={itemKey}>
          {error}
        </div>
      );
    })
  }

  setMessages = messages => {
    this.setState({ messages });
    setTimeout(this.resetMessages, this.ERROR_TIMEOUT);
  }

  resetMessages = () => {
    this.setState({ messages: []});
  }

  showMessages = () => {
    return this.state.messages.map((error, itemKey) => {
      return (
        <div className="alert alert-success" role="alert" key={itemKey}>
          {error}
        </div>
      );
    })
  }
}
export default RoleForm;
