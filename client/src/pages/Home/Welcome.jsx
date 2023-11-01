import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <h1>This is the Welcome Page</h1>
      <p>Good luck with the project, Group A!</p>

      <ul>
        <Link to="/home">
          <li>Home</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
        <Link to="/register">
          <li>Register</li>
        </Link>
        <Link to="/friends">
          <li>Friends</li>
        </Link>
      </ul>
    </div>
  );
};

export default Welcome;
