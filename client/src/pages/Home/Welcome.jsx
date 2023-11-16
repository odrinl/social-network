import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Welcome = () => {
  return (
    <Container>
      <Content>
        <LogoContainer>
          <Logo>
            <Aziel>Aziel</Aziel>
            <Net>Net</Net>
          </Logo>
        </LogoContainer>
        <WelcomeMessage>
          Welcome to AzielNet - Connecting Refugees in Netherlands
        </WelcomeMessage>
        <AdditionalSentence>
          A safe space for refugees to connect, share, and support each other.
        </AdditionalSentence>
        <ButtonsContainer>
          <SignUpButton to="/register">Sign Up</SignUpButton>
          <LoginButton to="/login">Login</LoginButton>
        </ButtonsContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Content = styled.div`
  text-align: center;
  color: #2c3e50;

  @media (max-width: 768px) {
    border: 3.5px solid #90467f;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2.5rem;
    border-radius: 16px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`;

const Logo = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  padding: 1rem;
  background: #90467f;
  border-radius: 1rem;
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.3);
  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 0.8rem;
  }
`;

const Aziel = styled.span`
  color: #3b4a47;
`;

const Net = styled.span`
  color: white;
`;

const WelcomeMessage = styled.p`
  font-size: 3rem;
  font-weight: bold;
  margin: 10px 0;
  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 0.8rem;
  }
`;

const AdditionalSentence = styled.p`
  font-size: 2rem;
  margin-bottom: 30px;
  margin-bottom: 3rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.8rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin: 0 10px;
  padding: 15px 50px;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2rem;
  border-radius: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3498db;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px 40px;
  }
`;

const LoginButton = styled(StyledLink)`
  background: #90467f;
`;

const SignUpButton = styled(StyledLink)`
  background: #90467f;
`;

export default Welcome;
