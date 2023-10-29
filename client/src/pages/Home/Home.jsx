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
      <div className="container wrapper">
        <div className="container homepage">
          <div className="container column">
            <div className="container block">
              <MyProfile />
            </div>
            <div className="title">
              <h2>My friends</h2>
            </div>
            <div className="container block">
              <MyFriends />
            </div>
          </div>
          <div className="container middle-column">
            <div className="container nav">
              <Nav />
            </div>
            <div className="container block">
              <Feed />
            </div>
          </div>
          <div className="container column">
            <div className="title">
              <h2>Events</h2>
            </div>
            <div className="container block">
              <Events />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
