import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCustomer from "./components/add-customer.component";
import Customer from "./components/customer.component";
import CustomersList from "./components/customers-list.component";

import AddMembership from "./components/add-membership.component";
import Membership from "./components/membership.component";
import MembershipsList from "./components/memberships-list.component";

import ArticlesList from "./components/articles-list.component"

import MainPage from "./components/main-page.component"

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/main"} className="navbar-brand">
            Xavi's Gym
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/customers"} className="nav-link">
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add_customer"} className="nav-link">
                New Client
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/memberships"} className="nav-link">
                Membership Plans
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add_membership"} className="nav-link">
                New Membership Plan
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/articles"} className="nav-link">
                Fitness Articles
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/main"]} component={MainPage} />
            <Route exact path="/customers" component={CustomersList} />
            <Route exact path="/add_customer" component={AddCustomer} />
            <Route path="/customers/:id" component={Customer} />
            <Route exact path="/memberships" component={MembershipsList} />
            <Route exact path="/add_membership" component={AddMembership} />
            <Route path="/memberships/:id" component={Membership} />
            <Route path="/articles/" component={ArticlesList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
