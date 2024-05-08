import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

export default class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.getComponents = this.getComponents.bind(this);
    this.state = {
      components: []
    };
  }

  getComponents(){
    const r = require.context('./articles/', false, /\.js$/).keys();
    this.setState({
      components: r.map(element=>element.slice(2, -3))
    });
  }

  componentDidMount() {
    this.getComponents();
  }

  render() {
    return (
      <div>
      <h4>Articles List</h4>
      <ul>
        {this.state.components.map((component, index) => (
            <li key={index}>
              <Link to={"/articles/"+component}>
              {component}
              </Link>
            </li>
          ))}
      </ul>
      <Switch>
        {this.state.components.map((component, index) => (
          <Route exact path ={"/articles/"+component} component ={require("./articles/"+component).default} key={index}/>
        ))}
      </Switch>
      </div>
    );
  }
}
