import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";
import { Link } from "react-router-dom";

export default class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveCustomers = this.retrieveCustomers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCustomer = this.setActiveCustomer.bind(this);
    this.removeAllCustomers = this.removeAllCustomers.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      customers: [],
      currentCustomer: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveCustomers();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveCustomers() {
    CustomerDataService.getAll()
      .then(response => {
        this.setState({
          customers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCustomers();
    this.setState({
      currentCustomer: null,
      currentIndex: -1
    });
  }

  setActiveCustomer(customer, index) {
    this.setState({
      currentCustomer: customer,
      currentIndex: index
    });
  }

  removeAllCustomers() {
    CustomerDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentCustomer: null,
      currentIndex: -1
    });

    CustomerDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          customers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, customers, currentCustomer, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by first name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Customers List</h4>

          <ul className="list-group">
            {customers &&
              customers.map((customer, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCustomer(customer, index)}
                  key={index}
                >
                  {customer.firstname}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCustomers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCustomer ? (
            <div>
              <h4>Customer</h4>
              <div>
                <label>
                  <strong>First Name:</strong>
                </label>{" "}
                {currentCustomer.firstname}
              </div>
              <div>
                <label>
                  <strong>Last Name:</strong>
                </label>{" "}
                {currentCustomer.lastname}
              </div>
              <div>
                <label>
                  <strong>Membership Plan:</strong>
                </label>{" "}
                {currentCustomer.membership}
              </div>
              <div>
                <label>
                  <strong>Email Address:</strong>
                </label>{" "}
                {currentCustomer.email}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCustomer.confirmed ? "Confirmed" : "Pending"}
              </div>

              <Link
                to={"/customers/" + currentCustomer.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Customer...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
