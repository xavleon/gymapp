import React, { Component } from "react";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import CustomerDataService from "../services/customer.service";
import MembershipDataService from "../services/membership.service";

export default class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeMembership = this.onChangeMembership.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.saveCustomer = this.saveCustomer.bind(this);
    this.newCustomer = this.newCustomer.bind(this);

    this.state = {
      id: null,
      firstname: "",
      lastname: "",
      membership: "",
      email: "",
      confirmed: false,

      submitted: false,

      options: []
    };
  }

  retrieveMemberships() {
    MembershipDataService.getAll()
      .then(response => {
        this.setState({
          options: response.data.map((membership,index)=>(membership.title))
        });
        console.log(response.data);
      })
      .catch(e => {
      console.log(e);
      });
  }

  componentDidMount() {
    this.retrieveMemberships();
  }

  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value
    });
  }

  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value
    });
  }

  onChangeMembership(option){
    this.setState({
      membership: option.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  saveCustomer() {
    var data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      membership: this.state.membership,
      email: this.state.email
    };

    CustomerDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          membership: response.data.membership,
          email: response.data.email,
          confirmed: response.data.confirmed,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCustomer() {
    this.setState({
      id: null,
      firstname: "",
      lastname: "",
      membership: "",
      email: "",
      confirmed: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCustomer}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                required
                value={this.state.firstname}
                onChange={this.onChangeFirstname}
                name="firstname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                required
                value={this.state.lastname}
                onChange={this.onChangeLastname}
                name="lastname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="membership">Membership Plan</label>
              <Dropdown
              options={this.state.options}
              value={this.state.membership}
              onChange={this.onChangeMembership}
              placeholder="Select an option"
              name="membership"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <button onClick={this.saveCustomer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
