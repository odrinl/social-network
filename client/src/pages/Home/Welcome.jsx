import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Welcome = () => {
  return (
    <FormWrapper>
      <FormContainer>
        <Container>
          <Heading>
            <span className="white">AZIEL</span>{" "}
            <span className="black">NET</span>
          </Heading>
          <StyledList>
            <StyledListItem>
              <StyledLink to="/login">
                <StyledButton>Login</StyledButton>
              </StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink to="/register">
                <StyledButton>Register</StyledButton>
              </StyledLink>
            </StyledListItem>
          </StyledList>
          <AdditionalSentence>Brings everyone closer ...</AdditionalSentence>
        </Container>
      </FormContainer>
    </FormWrapper>
  );
};

export default Welcome;

const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  margin: 1rem;
  width: 500px;
  min-width: 340px;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  overflow: hidden;
  border-radius: 20px;
  border: 3px solid #90467f;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
`;

const Heading = styled.h1`
  font-size: 40px;
  margin-bottom: 1rem;
  color: #3b4a47;
  font-weight: 800;
  font-family: Inter;
  .white {
    color: #3b4a47;
  }
  .black {
    color: #90467f;
  }
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  margin: 0;
  padding: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyledButton = styled.button`
  height: 50px;
  width: 12rem;
  border-radius: 12px;
  border: 0;
  outline: 0;
  background: #90467f;
  font-size: 17px;
  margin-top: 1rem;
  color: white;
  cursor: pointer;
  font-weight: bolder;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
  }
`;

const AdditionalSentence = styled.p`
  margin-top: 1rem;
  font-size: 20px;
  color: #b3a69d;
  font-weight: 500;
`;
