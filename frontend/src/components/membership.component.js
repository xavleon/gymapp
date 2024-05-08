import React, { Component } from "react";
import MembershipDataService from "../services/membership.service";

export default class Membership extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.getMembership = this.getMembership.bind(this);
    this.updateConfirmed = this.updateConfirmed.bind(this);
    this.updateMembership = this.updateMembership.bind(this);
    this.deleteMembership = this.deleteMembership.bind(this);

    this.state = {
      currentMembership: {
        id: null,
        title: "",
        description: "",
        confirmed: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getMembership(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMembership: {
          ...prevState.currentMembership,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(prevState => ({
      currentMembership: {
        ...prevState.currentMembership,
        description: description
      }
    }));
  }

  getMembership(id) {
    MembershipDataService.get(id)
      .then(response => {
        this.setState({
          currentMembership: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateConfirmed(status) {
    var data = {
      id: this.state.currentMembership.id,
      title: this.state.currentMembership.title,
      description: this.state.currentMembership.description,
      confirmed: status
    };

    MembershipDataService.update(this.state.currentMembership.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentMembership: {
            ...prevState.currentMembership,
            confirmed: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMembership() {
    MembershipDataService.update(
      this.state.currentMembership.id,
      this.state.currentMembership
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The membership was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteMembership() {
    MembershipDataService.delete(this.state.currentMembership.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/memberships')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentMembership } = this.state;

    return (
      <div>
        {currentMembership ? (
          <div className="edit-form">
            <h4>Membership</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMembership.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentMembership.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentMembership.confirmed ? "Confirmed" : "Pending"}
              </div>
            </form>

            {currentMembership.confirmed ? (
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
              onClick={this.deleteMembership}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMembership}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Membership...</p>
          </div>
        )}
      </div>
    );
  }
}
