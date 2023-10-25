import React from "react";
import TEST_ID from "./Home.testid";
import MyProfile from "../../components/MyProfile";
import MyFriends from "../../components/MyFriends";
import Nav from "../../components/Nav";
import Feed from "../../components/Feed";
import Events from "../../components/Events";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <h1>Welcome to the Home Page</h1>
      <div className="container">
        <div className="column">
          <h2>Column 1</h2>
          <div>
            <MyProfile />
            <MyFriends />
          </div>
        </div>
        <div className="column">
          <h2>Column 2</h2>
          <div>
            <Nav />
            <Feed />
          </div>
        </div>
        <div className="column">
          <h2>Column 3</h2>
          <div>
            <Events />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
