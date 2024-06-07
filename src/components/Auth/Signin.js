import React, { useState } from "react";
import "./Signin.css";
import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "./Firebase";

const auth = getAuth(app);

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((value) => {
        alert("Success");
        // Clear the input fields after successful creation
        setEmail("");
        setPassword("");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <h1>Signup here</h1>
      <div className="form-container">
      <form>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          id="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          id="password"
        />
        <button type="button" onClick={createUser}>
          Submit
        </button>
        <NavLink to="/login" activeClassName="active" style={{ color: "blue" }}>
          Already have an account
        </NavLink>
      </form>
    </div>
    </div>
  );
};

export default Signin;
