import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import Welcome from "./pages/Home/Welcome";
import LoginUser from "./pages/User/LoginUser";
import Friends from "./components/Friends";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/users" element={<UserList />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<CreateUser />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </>
  );
};

export default App;
