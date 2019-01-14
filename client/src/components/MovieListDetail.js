import React, {Component} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import defaultImage from "../img/bg-masthead.jpg";
import {Link} from "react-router-dom";


class MovieListDetail extends Component {
    BASE_URL = "/api/list_items/";
    MOVIE_BASE_URL = "/api/movies/";
    ERROR_TIMEOUT = 5000;
    POSTER_BASE_URL = " http://image.tmdb.org/t/p/w500/";
    DEFAULT_IMAGE = defaultImage;

    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            id: this.props.match.params.id,
            items: [],
            errors: [],
            messages: []
        };
    }
    render() {
        return (
                <div className="container-fluid">
                    <Navbar color="navbar-dark" type=""/>
                    <div className="row">
                        { this.renderItems() }
                    </div>
                    <hr/>
                    <div className="row">
                    <div className="col-md-12">
                        <Link to="/lists/" className="btn btn-primary"><i className="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;Back</Link>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12" style={{height: "180px"}}>
                        <Footer/>
                        </div>
                    </div>
                </div>
        );
    }

    componentDidMount = async () => {
        const res = await fetch(this.BASE_URL);
        const json = await res.json();
        if(json.success){
            const currentItems = json.data.filter(item => item.list_id == this.state.id);
            const movies = [];
            for(let item of currentItems){
                const res2 = await fetch(this.MOVIE_BASE_URL + item.movie_id);
                const movieJson = await res2.json();
                if(movieJson.success){
                    movies.push(movieJson.data[0]);
                }
            }
            this.setState({items: movies});
        }
    }

    renderItems = () => {
        return this.state.items.map((item, itemKey) => {
            return (
                <div className="col-md-4" key={itemKey}>
                    <div className="card col-md-12">
                    <img 
                        className="card-img-top" 
                        src={ item.poster_path ? this.POSTER_BASE_URL + item.poster_path : this.DEFAULT_IMAGE } 
                        alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.overview || item.tagline}</p>
                            <a href={item.homepage || "#"} className="btn btn-outline-secondary">Go to homepage</a>
                        </div>
                    </div>
                </div>
            );
        })
    }
}

export default MovieListDetail;