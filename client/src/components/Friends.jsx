import React, { useState } from "react";
import styled from "styled-components";
import FriendSearch from "./FriendSearch";
import FriendsComponentNav from "./FriendsComponentNav";
import FriendSearchedResults from "../pages/FriendsPage/FriendSearchedResults";
import FriendCard from "./friendsCards/FriendCard";
import FriendRequestCard from "./friendsCards/FriendRequestCard";
import SentRequestCard from "./friendsCards/SentRequestCard";

const Friends = () => {
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("Friends");

  const handleSearchSubmit = () => {
    setShowResults(true);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowResults(false); // Hide the results when switching tabs
  };

  return (
    <Container>
      <FriendSearch onSearchSubmit={handleSearchSubmit} />
      <FriendsComponentNav onTabClick={handleTabClick} activeTab={activeTab} />
      <Content>
        {showResults ? (
          <FriendSearchedResults />
        ) : (
          <div>
            {activeTab === "Friends" && <FriendCard />}
            {activeTab === "Friends Request" && <FriendRequestCard />}
            {activeTab === "Sent Request" && <SentRequestCard />}
          </div>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 50rem;

  @media (max-width: 768px) {
    height: 100%;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 50rem;

  @media (max-width: 768px) {
  }
`;

export default Friends;
