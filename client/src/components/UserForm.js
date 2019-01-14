import React, { Component } from "react";
import BreadcrumbArea from "./BreadcrumbArea";
import {Link, Redirect} from "react-router-dom";
import {methods, request} from "../helpers/HttpHelper";

class UserForm extends Component {
  BASE_URL = "/api/users/";
  ERROR_TIMEOUT = 5000;
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      isNew: this.props.match.params.id === "add",
      shouldRedirect: false,
      userData: {
        id: this.props.match.params.id === "add" ? "" : this.props.match.params.id,
        userName: "",
        pass: "",
        initialPass: "",
        firstName: "",
        lastName: "",
        role: ""
      },
      errors: []
    };
    console.log(this.state.userData.id);
  }

  render() {
    return (
      <div className="col-md-11">
        <BreadcrumbArea />
        <form className="col-md-8 offset-md-2">
          {this.showErrors()}
          <div className="form-group row btn-group">
            <Link id="backButton" name="back" className="btn" to="/admin/users">Back</Link>
          </div>
          <div className="form-group row">
            <label htmlFor="userId" className="col-md-2 col-form-label">User ID : </label>
            <div className="col-md-10">
            <input type="number" id="userId" name="userId" readOnly  className="form-control" value={this.state.userData.id} onChange={e => this.handleChange(e)}/>
          </div>
          </div>
          <div className="form-group row">
            <label htmlFor="userName" className="col-md-2 col-form-label">Username : </label>
            <div className="col-md-10">
              <input type="text" id="userName" name="userName"  className="form-control" value={this.state.userData.userName} onChange={e => this.handleChange(e)}/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="pass" className="col-md-2 col-form-label">Password : </label>
            <div className="col-md-10">
              <input type="password" id="pass" name="pass"  className="form-control" value={this.state.userData.pass} onChange={e => this.handleChange(e)}/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="firstName" className="col-md-2 col-form-label">First Name : </label>
            <div className="col-md-10">
            <input type="text" id="firstName" name="firstName"  className="form-control" value={this.state.userData.firstName} onChange={e => this.handleChange(e)}/>
          </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lastName" className="col-md-2 col-form-label">Last Name : </label>
            <div className="col-md-10">
            <input type="text" id="lastName" name="lastName"  className="form-control" value={this.state.userData.lastName} onChange={e => this.handleChange(e)}/>
          </div>
          </div>
          <div className="form-group row">
            <label htmlFor="role" className="col-md-2 col-form-label">Role : </label>
            <div className="col-md-10">
            <select id="role" name ="role" className="form-control" value={this.state.userData.role} onChange={e => this.handleChange(e)}>
                <option value="1">Admin</option>
                <option value="2">Normal user</option>
            </select>
          </div>
          </div>
          <div className="form-group row">
            <div className="col-md-2 btn-group">
              <button id="submitButton" name="submit" className="btn btn-warning" onClick={ e => this.handleSubmit(e)}>Submit</button>
              <button id="saveButton" name="save" className="btn" onClick={ e => this.handleSave(e)}>Save</button>
            </div>
            <div className="col-md-1 offset-md-8">
              {
                this.state.userData.id === ""
                ? null
                : <button id="deleteButton" name="delete" className="btn btn-danger" onClick={ e => this.handleDelete(e)}>Delete</button>
              }
            </div>
          </div>
        </form>
        { this.state.shouldRedirect ? <Redirect to='/admin/users' /> : null }
      </div>
    );
  }

  componentDidMount = () => {
    if(!this.state.isNew)
      this.populateUser();
  }

  populateUser = async () => {
    const res = await fetch(this.BASE_URL + this.state.userData.id);
    const json = await res.json();
    console.log(json);
    if(json.success){
      const currentUser = json.data[0];
      this.setState({
        userData: {
          id: currentUser.user_id,
          userName: currentUser.user_name,
          pass: currentUser.password,
          initialPass: currentUser.password,
          firstName: currentUser.firstname,
          lastName: currentUser.lastname,
          role: currentUser.role_id
        }, 
      });
    }
  }

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({ userData: {...this.state.userData, [name] : value}})
  }

  handleSubmit = async e => {
    e.preventDefault();
    if(this.validateUser()){
      const {
        id,
        userName,
        pass,
        initialPass,
        firstName,
        lastName,
        role} = this.state.userData;
      
      const method = this.state.isNew ? methods.POST : methods.PATCH;
    
      try {
        const res = await request(this.BASE_URL + id, method, {
          user_name: userName,
          password: initialPass !== pass ? pass : null,
          firstname: firstName,
          lastname: lastName || "",
          role_id: role
        });
        const data = await res.json();
        if(data.success){
          this.setState({shouldRedirect:true});
        }
      } catch (e){
        this.setErrors([e.toString()]);
      }
    }
  }

  handleSave = async e => {
    e.preventDefault();
    if(this.validateUser()){
      const {
        id,
        userName,
        pass,
        initialPass,
        firstName,
        lastName,
        role} = this.state.userData;
      try {
        const method = id === "" ? methods.POST : methods.PATCH;
        const res = await request(this.BASE_URL + id, method, {
          user_name: userName,
          password: initialPass !== pass ? pass : null,
          firstname: firstName,
          lastname: lastName || "",
          role_id: role
      });
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
    if(window.confirm(`Are you sure you want to delete ${this.state.userData.userName}?`)){
      const {id} = this.state.userData;
      try {
        const res = await request(this.BASE_URL + id, methods.DELETE);
        const data = await res.json();
       
        if(data.success){
          this.setState({shouldRedirect: true});
        }
      } catch (e){
        this.setErrors([e.toString()]);
      }
    }
  }

  validateUser = () => {
    const {id,
      userName,
      pass,
      firstName,
      lastName,
      role} = this.state.userData;
    let errors = [];
    let valid = true;
    if(userName===""){
      errors.push('Username must be filled out');
      valid = false;
    }
    if(pass === "" || pass.length < 6){
      errors.push('The password should be filled in and be at least 6 characters long');
      valid = false;
    }
    if(firstName===""){
      errors.push('You must fill out your name');
      valid = false;
    }
    if(role===null || role===0){
      errors.push('You must pick a role');
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
export default UserForm;
