import React from "react";
import { useNavigate } from "react-router";

import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  top: 30px;
  right: 50px;
  padding: 10px 15px;
  background-color: #1c2733;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <Button onClick={handleSignOut} className="sign-out-button">
      Sign Out
    </Button>
  );
};

export default SignOutButton;
