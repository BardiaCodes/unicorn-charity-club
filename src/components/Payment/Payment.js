import React, { Component } from "react";
import Arrow_backward from "../../image/arrow-backward.png";
import "./Payment.css";
import "../Mobile_toolbar/Mobile_toolbar.css";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Mobile_toolbar from "../Mobile_toolbar/Mobile_toolbar";

class Payment extends React.Component {
  render() {
    return (
      <Router>
        <div
          className="account-menu"
          id="container"
          style={{ display: "block" }}
        >
          <div className="header__wrapper">
            <div className="header__logo">
              <div className="header-menu-mobile">
                <NavLink to={"/Menu"}>
                  <a href="/Menu">
                    <img src={Arrow_backward} alt="Backward Arrow" />
                  </a>
                </NavLink>
              </div>
            </div>
            <div className="header-title">Payment</div>
          </div>
          <div className="account-menu__content">
            {/* <div className="account-menu__item">
              <a href="/"> Address</a>
            </div> */}
            <h1>Payment</h1>
          </div>
          {/* </div> */}
          <Route path="/Menu" exact component={Mobile_toolbar} />
        </div>
      </Router>
    );
  }
}

export default Payment;
