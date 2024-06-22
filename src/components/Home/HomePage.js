import React from "react";
import "./HomePage.css";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="header">
        <div>welcome to Expense Tracker!!!</div>
        <div className="profile">
          <NavLink to="/Profile" activeClassName="active">
            Profile
          </NavLink>
          <NavLink to="/Expense">Expense</NavLink>
          <NavLink to="/home" exact>
            Home
          </NavLink>
          <NavLink to="/logout">Logout</NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
