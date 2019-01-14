import React, { Component } from "react";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

class Login extends Component {
  ERROR_TIMEOUT = 5000;
  constructor(){
    super();
    this.state = {
      userData: {
        userName: "",
        pass: ""
      }, 
      errors: []
    };
  }
  render() {
    return (
      <div>
      <div className="container-fluid">
        <Navbar color="navbar-dark" type=""/>
        {this.showErrors()}
        <div className="col-md-8 offset-md-2">
            <form>
                <h2>Log in</h2>
                <div className="form-group row">
                  <label htmlFor="userName" className="col-md-2 col-form-label">Username: </label>
                  <div className="col-md-10">
                    <input type="text" name="userName" className="form-control" value={this.state.userData.userName} onChange={e => this.updateUserData(e)}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="pass" className="col-md-2 col-form-label">Password: </label>
                  <div className="col-md-10">
                    <input type="password" name="pass" className="form-control" value={this.state.userData.pass} onChange={e => this.updateUserData(e)}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2">
                    <button id="btn_login" className="btn btn-primary" onClick={e => this.handleSubmit(e)}>Login</button>
                  </div>
                  <div className="col-md-2">
                    <Link className="btn btn-secondary" to="/signup">Sign up</Link>
                  </div>
                </div>
            </form>
            <hr />
            <div className="row">
            <div className="col-md-12">
              <Link to="/" className="btn btn-primary"><i className="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;Back</Link>
            </div>
            </div>
        </div>
      </div>
        <Footer/>
      </div>
    );
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.validateUser()){
    }
  }

  validateUser(){
    const {userName, pass} = this.state.userData;
    let errors = [];
    let valid = true;
    if(userName === ""){
      errors.push('Username must be filled out!');
      valid = false;
    }
    if(pass === "" || pass.length < 6){
      errors.push('the password shoud exist and be at least 6 characters long');
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
export default Login;
