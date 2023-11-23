import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const backgroundImage = "https://res.cloudinary.com/dtb1hpuil/image/upload/v1700751077/AA_peorrh.jpg";

const Welcome = () => {
  return (
    <FormWrapper>
      <FormContainer>
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
      </FormContainer>
    </FormWrapper>
  );
};

export default Welcome;

const FormWrapper = styled.div`
position:relative;
background-image: url(${backgroundImage});
background-size: cover; 
background-position: center;
height: 100vh; 
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  position:relative;
  right:25%;
  align-items: center;
  height: 100vh;
  
`;



const Heading = styled.h1`
  position:relative;
  top:70px;
  left:-140px;
  font-size: 40px;
  margin-bottom: 1rem;
  color: #05445E;
  font-weight: 800;
  font-family: Inter;
  .white {
    color: #05445E;
  }
  .black {
    color: #189AB4;
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
  background: #189AB4;
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
  color: #75E6DA;
  font-weight: 500;
`;
