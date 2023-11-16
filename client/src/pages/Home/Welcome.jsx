import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Welcome = () => {
  return (
    <Container>
      <BackgroundImage />

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
  position: relative;
  height: 90vh;
  padding: 2rem;
  display: flex;
  color: #fff;
  font-family: "Arial", sans-serif;
  border: 3.5px solid #90467f;
  margin: 5rem;
  border-radius: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 0.4rem;
    height: 85vh;
    margin: 3rem;
    border: none;
  }
`;

const BackgroundImage = styled.div`
  flex: 1.6;
  background: url("https://digitalcanvasme.com/wp-content/uploads/2021/02/SMM.png")
    center/contain no-repeat;
  background-size: contain;
  background-position: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 2rem;
  border: 3.5px solid #90467f;
  border-radius: 16px;

  @media (max-width: 768px) {
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  background: #90467f;
  border-radius: 1rem;
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 20px;
  position: relative;
  display: flex;
  padding: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 0.8rem;
    margin-bottom: 5px;
  }
`;

const Aziel = styled.span`
  color: #3b4a47;
`;

const Net = styled.span`
  color: white;
`;

const WelcomeMessage = styled.p`
  font-size: 4.5rem;
  font-weight: bold;
  color: #2a99d1;
  width: 50rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: "Agbalumo", sans-serif;

  @media (max-width: 768px) {
    font-size: 2.8rem;
    width: 100%;
  }
`;

const AdditionalSentence = styled.p`
  font-size: 3rem;
  width: 40rem;
  color: gray;
  font-family: "Agbalumo", sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.8rem;
    width: 80%;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin: 0 10px;
  padding: 30px 100px;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.5rem;
  border-radius: 4rem;
  transition: background-color 0.3s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #e0a800;
  }

  @media (max-width: 768px) {
    padding: 10px 10px;
    width: 9rem;
    font-size: 0.8rem;
  }
`;

const LoginButton = styled(StyledLink)`
  background: #90467f;
`;

const SignUpButton = styled(StyledLink)`
  background: #90467f;
  margin-right: 1rem;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;
export default Welcome;
