import React, { Component } from "react";
import MembershipDataService from "../services/membership.service";
import { Link } from "react-router-dom";

export default class MembershipsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveMemberships = this.retrieveMemberships.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMembership = this.setActiveMembership.bind(this);
    this.removeAllMemberships = this.removeAllMemberships.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      memberships: [],
      currentMembership: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveMemberships();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveMemberships() {
    MembershipDataService.getAll()
      .then(response => {
        this.setState({
          memberships: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMemberships();
    this.setState({
      currentMembership: null,
      currentIndex: -1
    });
  }

  setActiveMembership(membership, index) {
    this.setState({
      currentMembership: membership,
      currentIndex: index
    });
  }

  removeAllMemberships() {
    MembershipDataService.deleteAll()
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
      currentMembership: null,
      currentIndex: -1
    });

    MembershipDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          memberships: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, memberships, currentMembership, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
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
          <h4>Memberships List</h4>

          <ul className="list-group">
            {memberships &&
              memberships.map((membership, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMembership(membership, index)}
                  key={index}
                >
                  {membership.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllMemberships}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentMembership ? (
            <div>
              <h4>Membership</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentMembership.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentMembership.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentMembership.confirmed ? "Confirmed" : "Pending"}
              </div>

              <Link
                to={"/memberships/" + currentMembership.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Membership...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
