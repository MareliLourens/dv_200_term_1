import React from "react";
import Web_Logo from './logo.webp'
import Settings_Logo from './quit.svg'
import Landing_Nav_Logo from './landing.webp'
import Compare_Nav_Logo from './compare.svg'
import Timeline_Nav_Logo from './timeline.webp'
import './navbar.css';


function BasicNav() {

  return (
    <div className="App">
      <nav class="navbar">
        <div class="contain">
          <a class="nav-link" href="/" >
            <img class="nav-image logo" src={Web_Logo} alt="Web_Logo"></img>
          </a>
          <ul class="navbar-nav menu">
            <li class="nav-item">
              <a class="nav-link" href="/" >
                <img class="nav-image" src={Landing_Nav_Logo} alt="Landing_Nav_Logo"></img>
                <h6>Home</h6>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/compare">
                <img class="nav-image" src={Compare_Nav_Logo} alt="Compare_Nav_Logo"></img>
                <h6>Compare</h6>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/timeline">
                <img class="nav-image" src={Timeline_Nav_Logo} alt="Timeline_Nav_Logo"></img>
                <h6>Timeline</h6>
              </a>
            </li>
          </ul>
          <a class="nav-link*" href="/" >
            <img class="nav-quit" src={Settings_Logo} alt="Settings_Logo"></img>
          </a>
        </div>
      </nav>
    </div>
  )
}

export default BasicNav;