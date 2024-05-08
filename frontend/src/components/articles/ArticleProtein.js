import React, { Component } from "react";
import logo from './protein.jpg';

export default class ArticleProtein extends Component {
  render() {
    return(
      <div>
        <div>
          <img src={logo} alt="Logo"  width="800" height="500" />
        </div>
        <div>
          <h4>THINGS YOU SHOULD KNOW ABOUT PROTEIN.</h4>

          <p>If you slept through health class and missed the definition of protein, you’re not alone.
          We asked Lynn to sum it up without going full Bill Nye on us.
          “Technically proteins are large molecules that consist of amino acids, and they make every cell in our bodies.
          So they’re the building block of muscle, and no bodily function can happen without it.”
          Not consuming enough protein also means you no longer need to worry about weight loss or sculpting six-pack abs because you’re sabotaging your ability to
          A) fulfill your potential inside of the gym, and
          B) remain in good health.
          “Without enough protein, your body will start to pull fuel from places like your bones, organs, and heart. You won’t stay healthy for long,” she adds.</p>

          <p>When you’re in the gym rocking out Phil Heath’s quads routine, you’re tearing muscle fibers with each grueling set.
          The protein you consume helps the muscles that were compromised recover quicker.
          This is why we recommend taking post-workout protein within an hour after your last set.
          “Essentially, the protein helps take what was damaged and put it all back together,” she says.
          “With a whey shake, the minute it enters the body a “quick-hit” of whey gets into cells and is then transported to repair and replace muscle tissue.”</p>
        </div>
      </div>
    );
  }
}
