import React from "react";
import Nav from "../../components/Nav";
import CreatePost from "../../components/CreatePost";
import logo from "../../../public/logo.png";
import SignOutButton from "../../components/SignOutButton";

const ProfilePage = () => {
  return (
    <div className="container wrapper">
      <div className="container homepage">
        <div className="container column"></div>
        <div className="container middle-column">
          <div className="container logo">
            <div className="container">
              <img src={logo} alt="logo" />
            </div>

            <div className="container nav">
              <Nav />
            </div>
          </div>

          <CreatePost />
        </div>

        <div className="container sign-out-button-container">
          <SignOutButton />
        </div>
        <div className="container column"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
