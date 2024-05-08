import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeMembership = this.onChangeMembership.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.getCustomer = this.getCustomer.bind(this);
    this.updateConfirmed = this.updateConfirmed.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);

    this.state = {
      currentCustomer: {
        id: null,
        firstname: "",
        lastname: "",
        membership: "",
        email: "",
        confirmed: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCustomer(this.props.match.params.id);
  }

  onChangeFirstname(e) {
    const firstname = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCustomer: {
          ...prevState.currentCustomer,
          firstname: firstname
        }
      };
    });
  }

  onChangeLastname(e) {
    const lastname = e.target.value;

    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        lastname: lastname
      }
    }));
  }

  onChangeMembership(e) {
    const membership = e.target.value;

    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        membership: membership
      }
    }));
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        email: email
      }
    }));
  }

  getCustomer(id) {
    CustomerDataService.get(id)
      .then(response => {
        this.setState({
          currentCustomer: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateConfirmed(status) {
    var data = {
      id: this.state.currentCustomer.id,
      firstname: this.state.currentCustomer.firstname,
      lastname: this.state.currentCustomer.lastname,
      membership: this.state.currentCustomer.membership,
      email: this.state.currentCustomer.email,
      confirmed: status
    };

    CustomerDataService.update(this.state.currentCustomer.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentCustomer: {
            ...prevState.currentCustomer,
            confirmed: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCustomer() {
    CustomerDataService.update(
      this.state.currentCustomer.id,
      this.state.currentCustomer
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The customer was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCustomer() {
    CustomerDataService.delete(this.state.currentCustomer.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/customers')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCustomer } = this.state;

    return (
      <div>
        {currentCustomer ? (
          <div className="edit-form">
            <h4>Customer</h4>
            <form>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  value={currentCustomer.firstname}
                  onChange={this.onChangeFirstname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={currentCustomer.lastname}
                  onChange={this.onChangeLastname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="membership">Membership Plan</label>
                <input
                  type="text"
                  className="form-control"
                  id="membership"
                  value={currentCustomer.membership}
                  onChange={this.onChangeMembership}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentCustomer.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCustomer.confirmed ? "Confirmed" : "Pending"}
              </div>
            </form>

            {currentCustomer.confirmed ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateConfirmed(false)}
              >
                Unconfirm
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateConfirmed(true)}
              >
                Confirm
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCustomer}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCustomer}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Customer...</p>
          </div>
        )}
      </div>
    );
  }
}
