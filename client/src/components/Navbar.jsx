import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import alert from 'sweetalert';
import { UserContext } from '../App';

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const Logout = async () => {
    const res = await fetch('/logout');
    if (res.status === 401) {
      alert('Opps! 😅', 'You are already logged out!', 'warning');
    } else if (res.status === 201) {
      alert('Logged Out!', 'Logged out successfully!', 'success');
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand fs-3 fw-bold px-2" to="#">Keeper</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to='/'>Home <span className="sr-only"></span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">Register</NavLink>
            </li>

            {state ? (<li className="nav-item">
              <NavLink className="nav-link" to="/logout" onClick={Logout}>Logout</NavLink>
            </li>) : (<li className="nav-item">
              <NavLink className="nav-link" to="/signin">Login</NavLink>
            </li>)}
          </ul>
        </div>
      </nav>
    </>
  );
}
export default Navbar;