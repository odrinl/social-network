import React from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "./Feed";
import Events from "./Events";
import Friends from "./Friends";
import MyProfileComponent from "./Profile/MyProfileComponent";

const SharedArea = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="events" element={<Events />} />
        <Route path="friends" element={<Friends />} />
        <Route path="myprofile" element={<MyProfileComponent />} />
      </Routes>
    </>
  );
};

export default SharedArea;
