import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import Welcome from "./pages/Home/Welcome";
import LoginUser from "./pages/User/LoginUser";
import ProfilePage from "./pages/Profile/ProfilePage";
import SharedArea from "./components/SharedArea";
import Feed from "./components/Feed";

import Friends from "./components/Friends";
import Myprofile from "./components/profile/Myprofile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<SharedArea />} />
          <Route path="/home/" element={<Feed />} />
          <Route path="/home/myprofile/" element={<Myprofile />} />
          <Route path="/home/friends" element={<Friends />} />
        </Route>
        <Route path="/home/users" element={<UserList />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<CreateUser />} />
        <Route path="/home/my-profile/" element={<ProfilePage />} />
        <Route path="/home/my-profile/:userId" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;
