import React, {Component} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { getCookie, deleteCookie } from "../helpers/CookieHelper";

class MovieList extends Component {
    AUTH_URL = "/api/authenticate/";
    BASE_URL = "/api/lists";
    ERROR_TIMEOUT = 5000;
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            currentUser: null,
            items: [],
            errors: [],
            messages: []
        };
    }
    render() {
        return (
            <div>
            <div className="container-fluid">
                <Navbar color="navbar-dark" type="" currentUser={this.state.currentUser} handleLogout={this.handleLogout}/>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Movie list</th>
                        <th>Username</th> 
                        <th>Personal rating:</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        { this.renderItems() }
                    </tbody>
                </table>
                <hr />
                <div className="row">
                <div className="col-md-12">
                    <Link to="/" className="btn btn-primary"><i className="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;Back</Link>
                </div>
                </div>
            </div>
            <Footer/>
            </div>
        );
    }

    handleLogout = () => {
        deleteCookie("api_token");
        this.setState({ currentUser: null });
    };

    componentWillMount = async () => {
        const apiToken = getCookie("api_token");
        if(apiToken !== ""){
          const res = await fetch(this.AUTH_URL + encodeURIComponent(apiToken));
          const json = await res.json();
          if(json.success){
            this.setState({ ...this.state, currentUser: json.data, shouldRedirect: true});
          }
        }
      }

    componentDidMount = async () => {
        const res = await fetch(this.BASE_URL);
        const json = await res.json();
        if(json.success){
            this.setState({items: json.data});
        }
    }

    renderItems = () => {
        return this.state.items.map((item, itemKey) => {
            return (
                <tr key={itemKey}>
                    <td>{item.list_id}</td>
                    <td>{item.user_id}</td> 
                    <td>{item.personal_rating}</td>
                    <td>
                        <Link 
                            className="btn btn-outline-secondary" 
                            to={`/lists/${item.list_id}`}>
                            See List
                        </Link>
                    </td>
                </tr>
            );
        });
    }
}

export default MovieList;