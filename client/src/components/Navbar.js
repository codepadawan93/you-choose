import React from "react";
import {Link} from "react-router-dom";

const Navbar = props => {
    return(
        <nav className={`navbar navbar-expand-lg ${props.color} ${props.type}`} id="mainNav">
            <div className="container">
            <a className="navbar-brand js-scroll-trigger">YOU CHOOSE</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link js-scroll-trigger" to="/login">Log in</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link js-scroll-trigger" to="/lists">See Lists</Link>
                </li>
                </ul>
            </div>
            </div>
        </nav>
    );
}

export default Navbar;