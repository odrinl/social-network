import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import Welcome from "./pages/Home/Welcome";
import Login from "./pages/Home/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/users" element={<UserList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateUser />} />
      </Routes>
    </>
  );
};

export default App;
