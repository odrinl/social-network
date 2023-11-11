import React from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "./Feed";
import Events from "./Events";
import Friends from "./Friends";
import Myprofile from "./profile/Myprofile";

const SharedArea = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="events" element={<Events />} />
        <Route path="friends" element={<Friends />} />
        <Route path="myprofile" element={<Myprofile />} />
      </Routes>
    </>
  );
};

export default SharedArea;
