import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Error404 from "./components/Error404";
import MovieList from "./components/MovieList";
import MovieListDetail from "./components/MovieListDetail";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/lists" component={MovieList} />
              <Route exact path="/lists/:id" component={MovieListDetail} />
              <Route path="/admin" component={Admin} />
              <Route component={Error404} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
