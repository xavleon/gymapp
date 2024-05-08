import React, { Component } from "react";
import MembershipDataService from "../services/membership.service";

export default class AddMembership extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.saveMembership = this.saveMembership.bind(this);
    this.newMembership = this.newMembership.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      confirmed: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveMembership() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    MembershipDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          confirmed: response.data.confirmed,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMembership() {
    this.setState({
      id: null,
      title: "",
      description: "",
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
            <button className="btn btn-success" onClick={this.newMembership}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveMembership} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
