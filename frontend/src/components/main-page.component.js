import React, { Component } from "react";
import logo from './45671.jpg';

export default class MainPage extends Component {
  render() {
    return(
      <div>
        <div>
          <img src={logo} alt="Logo"  width="500" height="500" />
          <a href='https://www.freepik.com/vectors/logo'> Logo vector created by macrovector - www.freepik.com</a>
        </div>
        <div>
          <h4>Much like our clientele, the Manhattan Athletic Club believes in pushing ourselves. In short, we go farther.</h4>

          <p>As a member of The MANHATTAN ATHLETIC CLUB, you can depend on our physical fitness expertise to help guide the journey towards your goals, whatever they might be.</p>

          <li> A gym structured to flow, getting you in and out fast.</li>
          <li> Equipment upgraded regularly, and cared for meticulously. </li>
          <li> Clean is the catchword: no less than three round-the-clock cleaning crews see to it that the space, equipment, and locker rooms are immaculate at all times. </li>
          <li> Park Avenue’s only indoor basketball court—with daily lunchtime and evening pick-up games. </li>
          <li> Specialty sports such as Tae Kwon Do, boxing, TRX, and yoga—without extra fees for uniforms, hand wraps, and yoga mats. </li>
        </div>
      </div>
    );
  }
}
