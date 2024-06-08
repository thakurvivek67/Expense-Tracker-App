import React from "react";
import "./HomePage.css";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="header">
        <div>welcome to Expense Tracker!!!</div>
        <div className="profile">
          your profile is incomplete.<NavLink to="/Profile" activeClassName="active" style={{ color: "blue" }}>Complete now</NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
