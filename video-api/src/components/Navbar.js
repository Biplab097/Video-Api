import React from 'react'
import {Link,NavLink} from "react-router-dom";
// import { FormControl,Form,NavDropdown,Nav,Button, Navbar } from 'react-bootstrap'
import "./style/Navbar.css";
import logo from "./image/Hexagon.png"

function NavBar() {
    return (
    <div className="navbar">
      <div class="topnav">
        <a class="active" href="/">Home</a>
        <a href="https://hexagonppm.com/">Hexagon PPM</a>
        <a href="https://hexagonppm.com/contact">Contact</a>
        <a  href="https://hexagonppm.com/about">About</a>
        <NavLink  to='/view'>View</NavLink>
        <NavLink  to='upload'>Upload</NavLink>
        <Link class="margin"></Link>
        <a class="navbar-brand" href="/">
          <div class="image" >
            <img src={logo} class="image"></img>
          </div>
        </a>
      </div>
    </div>
    )
}

export default NavBar