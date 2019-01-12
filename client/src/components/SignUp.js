import React, { Component } from "react";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";

class SignUp extends Component {
  ERROR_TIMEOUT = 5000;
  constructor(){
    super();
    this.state = {
      userData: {
        userName: "",
        pass: "",
        firstName: "",
        lastName: ""
      },
      errors: []
    };
  }
  render() {
    return (
      <div className="container">
        <Navbar color="navbar-dark" type=""/>
        {this.showErrors()}
      <div> 
        <h2>Sign up</h2>
        <form>
          <div className="form-group row">
            <label htmlFor="userName" className="col-md-2 col-form-label">Username: </label>
            <div className="col-md-10">
              <input type="text" name="userName" className="form-control" value={this.state.userData.userName} onChange={e => {this.updateUserData(e)}}/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="pass" className="col-md-2 col-form-label">Password: </label>
            <div className="col-md-10">
              <input type="password" name="pass" className="form-control" value={this.state.userData.pass} onChange={e => {this.updateUserData(e)}}/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="firstName" className="col-md-2 col-form-label">First Name: </label>
            <div className="col-md-10">
              <input type="text" name="firstName" className="form-control" value={this.state.userData.firstName} onChange={e => {this.updateUserData(e)}}/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lastName" className="col-md-2 col-form-label">Last Name: </label>
            <div className="col-md-10">
              <input type="text" name="lastName" className="form-control" value={this.state.userData.lastName} onChange={e => {this.updateUserData(e)}}/>
            </div>
          </div>
          <button className="btn btn-primary" onClick={ e => this.handleSubmit(e)}>Submit</button>
          <Link className="btn btn-primary" to="/login">Log in</Link>
        </form>
      </div>
      </div>
    );
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.validateUser()){
    }
  }

  validateUser(){
    const {userName, pass, firstName, lastName} = this.state.userData;
    let errors = [];
    let valid = true;
    if(userName===""){
      errors.push('Username must be filled out!');
      valid = false;
    }
    if(pass === "" || pass.length <6){
      errors.push('the password shoud exist and be at least 6 characters long');
      valid = false;
    }
    if(firstName===""){
      errors.push('You must fill your name');
      valid = false;
    }
    this.setErrors(errors);
    setTimeout(() => this.resetErrors(), this.ERROR_TIMEOUT);
    return valid;
  }

  updateUserData = e => {
    this.setState({
      userData: {...this.state.userData, [e.target.name] : e.target.value}}
    );
  }

  setErrors = errors => {
    this.setState({ errors });
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
}
export default SignUp;
