import React from "react";
import TEST_ID from "./Home.testid";
import MyProfileSideSection from "../../components/MyProfileSideSection";
import FriendSideSection from "../../components/FriendSideSection";
import Nav from "../../components/Nav";
import SharedArea from "../../components/SharedArea";
import EventSideSection from "../../components/EventSideSection";
import logo from "../../../public/logo.png";
import SignOutButton from "../../components/SignOutButton";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <div className="container wrapper">
        <div className="container homepage">
          <div className="container column">
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
            <div className="container logo">
              <div className="container">
                <img src={logo} alt="logo" />
              </div>

              <div className="container nav">
                <Nav />
              </div>
            </div>
            <SharedArea />
          </div>
          <div className="container column">
            <div className="events">
              <div className="title">
                <h2>Events</h2>
              </div>
              <div className="container block">
                <SignOutButton />
                <EventSideSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
