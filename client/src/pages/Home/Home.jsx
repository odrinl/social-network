import React from "react";
import { Link } from "react-router-dom";

import TEST_ID from "./Home.testid";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <h1>This is the homepage</h1>

      <p>Good luck with the project, Group A!</p>
      <Link to="/home/users">Users</Link>
    </div>
  );
};

export default Home;
