import React from "react";
import styled from "styled-components";
import { fakeData } from "./Myprofile";

function About() {
  const user = fakeData;
  return (
    <AboutContainer>
      <CenteredContent>
        <ProfilePic src={user.profilePic} alt="Profile Picture" />
      </CenteredContent>
      <AboutHeader>About</AboutHeader>
      <AboutSection>
        <AboutSectionContent>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Location:</strong> {user.location}
          </p>
        </AboutSectionContent>
      </AboutSection>
      <AboutSection>
        <AboutSectionTitle>Bio</AboutSectionTitle>
        <AboutSectionContent>
          <p>{user.bio}</p>
        </AboutSectionContent>
      </AboutSection>
      <AboutSection>
        <AboutSectionContent>
          <p>
            <strong>Email:</strong> {user.contact.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.contact.phone}
          </p>
        </AboutSectionContent>
      </AboutSection>
      <EditButton>Edit About</EditButton>
    </AboutContainer>
  );
}

const AboutContainer = styled.div`
  padding: 5px;
`;

const CenteredContent = styled.div`
  text-align: center;
  margin: 10px, 0, 10px, 0;
`;

const ProfilePic = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 5px solid #fff;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
`;

const AboutHeader = styled.h2`
  font-size: 24px;
  color: #1da1f2;
`;

const EditButton = styled.button`
  background-color: #1da1f2;
  text-align: center;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const AboutSection = styled.div`
  margin: 10px 0;
`;

const AboutSectionTitle = styled.h3`
  font-size: 18px;
  color: #333;
`;

const AboutSectionContent = styled.div`
  p {
    margin: 5px 0;
  }

  strong {
    color: #1da1f2;
  }
`;

export default About;
