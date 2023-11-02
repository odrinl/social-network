import React from "react";
import Nav from "../../components/Nav";
import CreatePost from "../../components/CreatePost";

const ProfilePage = () => {
  return (
    <div className="container wrapper">
      <div className="container homepage">
        <div className="container column"></div>
        <div className="container middle-column">
          <div className="container nav">
            <Nav />
          </div>

          <CreatePost />
        </div>
        <div className="container column"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
