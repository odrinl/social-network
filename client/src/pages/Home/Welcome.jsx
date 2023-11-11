import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Welcome = () => {
  return (
    <Container>
      <h1>This is the Welcome Page</h1>
      <p>Good luck with the project, Group A!</p>

      <ul>
        <Link to="/login">
          <li>Login</li>
        </Link>
        <Link to="/register">
          <li>Register</li>
        </Link>
      </ul>
    </Container>
  );
};

export default Welcome;


const Container = styled.div`
  min-width: 40%;
  height: 85vh;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  padding: 40px;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  border: 3px solid #90467f;
  @media (max-width: 768px) {
    width: 80%;
  }
`;