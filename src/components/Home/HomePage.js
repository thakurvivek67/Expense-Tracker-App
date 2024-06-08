import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <div className="header">
        <div>welcome to Expense Tracker!!!</div>
        <div className="profile">
          your profile is incomplete.<button>Complete now</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
