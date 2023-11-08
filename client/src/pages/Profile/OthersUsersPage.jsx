import React from "react";
import Nav from "../../components/Nav";
import CreatePost from "../../components/CreatePost";
import logo from "../../../public/logo.png";

import FriendSideSection from "../../components/FriendSideSection";
import EventSideSection from "../../components/EventSideSection";
import MyPhotos from "../../components/profile/MyPhotos";

import MyPosts from "../../components/profile/MyPosts";
import styled from "styled-components";
import OtherUserProfile from "../../components/profile/others/OtherUserProfile";
import OthersAbout from "../../components/profile/others/OthersAbout";

const OtherUserPage = () => {
  return (
    <div className="container wrapper">
      <div className="container homepage">
        <div className="container column">
          <div className="container block">
            <OthersAbout />
          </div>

          <div className="container block">
            <FriendSideSection />
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

          <OtherUserProfile />
          <CreatePost />
          <Content>
            <MyPosts />
          </Content>
        </div>

        <div className="container column">
          <div className="container block">
            <EventSideSection />
          </div>

          <MyPhotos />
        </div>
      </div>
    </div>
  );
};
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 33rem;
  // background: red;
  @media (max-width: 768px) {
  }
`;
export default OtherUserPage;
