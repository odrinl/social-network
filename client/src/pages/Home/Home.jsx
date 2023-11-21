import React from "react";
import TEST_ID from "./Home.testid";
import MyProfileSideSection from "../../components/MyProfileSideSection";
import FriendSideSection from "../../components/FriendSideSection";
import Nav from "../../components/Nav";
import SharedArea from "../../components/SharedArea";
import NewsSideSection from "../../components/NewsSideSection";
import logo from "../../../public/logo.png";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <div className="container wrapper">
        <div className="container homepage">
          <div className="container column">
            <div className="container logo">
              <div className="container">
                <img src={logo} alt="logo" />
              </div>
            </div>
            <div className="container block my-profile">
              <MyProfileSideSection />
            </div>
            <div className="my-friends">
              <div className="title">
                <h2>My friends</h2>
              </div>
              <div className="container block">
                <FriendSideSection />
              </div>
            </div>
          </div>
          <div className="container middle-column">
            <Nav />

            <SharedArea />
          </div>
          <div className="container column">
            <div className="events">
              <div className="title">
                <h2>News from IND</h2>
              </div>
              <div className="container block">
                <NewsSideSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
