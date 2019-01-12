import React, { Component } from "react";
import { Link } from "react-router-dom";
import Subscribe from "./Subscribe";
import Navbar from "./Navbar";

const LandingPage = () => {
  return (
    <div>

        <Navbar color="navbar-light" type="fixed-top"/>

        <header className="masthead">
            <div className="container d-flex h-100 align-items-center">
            <div className="mx-auto text-center">
                <h1 className="mx-auto my-0 text-uppercase">You Choose</h1>
                <h2 className="text-white-50 mx-auto mt-2 mb-5">Choose your movies and share them with your friends!</h2>
                <Link to="/signup" className="btn btn-primary js-scroll-trigger">Get Started</Link>
            </div>
            </div>
        </header>

      <Subscribe />

      <section className="contact-section bg-black">
        <div className="container">

          <div className="row">

            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <i className="fas fa-map-marked-alt text-primary mb-2"></i>
                  <h4 className="text-uppercase m-0">Address</h4>
                  <hr className="my-4" />
                  <div className="small text-black-50">4923 Market Street, Orlando FL</div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <i className="fas fa-envelope text-primary mb-2"></i>
                  <h4 className="text-uppercase m-0">Email</h4>
                  <hr className="my-4" />
                  <div className="small text-black-50">
                    <a href="#">hello@yourdomain.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <i className="fas fa-mobile-alt text-primary mb-2"></i>
                  <h4 className="text-uppercase m-0">Phone</h4>
                  <hr className="my-4" />
                  <div className="small text-black-50">+1 (555) 902-8832</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black small text-center text-white-50">
        <div className="container">
          Copyright &copy; YouChoose 2018-2019
        </div>
      </footer>
      </div>
  );
};
export default LandingPage;
