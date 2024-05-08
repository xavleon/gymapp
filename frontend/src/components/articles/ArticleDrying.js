import React, { Component } from "react";
import logo from './taylor-dayne-loyd.webp';

export default class ArticleRest extends Component {
  render() {
    return(
      <div>
        <div>
          <img src={logo} alt="Logo"  width="800" height="500" />
        </div>
        <div>
          <h4>Ways to Get the Dry, Cut, Super-lean Look of a Fitness Model.</h4>

          <ol>
            <p> Water load </p>
            <b> Flush your system with water, then taper your consumption slowly to produce a drier look that highlights your abs. Drink up:</b>

            <li> Days 1-3: 3 gallons</li>
            <li> Day 4: 2.5 gallons</li>
            <li> Day 5: 1.75 gallons</li>
            <li> Day 6: 0.75 gallon</li>
            <li> Day 7: 16 ounces—sip it throughout the day to keep you sane.</li>

            Stay the course until you snap the pic.
          </ol>
        </div>
      </div>
    );
  }
}
