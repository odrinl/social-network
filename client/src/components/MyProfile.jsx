import React from "react";
import styled from "styled-components";

const MyProfile = () => {
  return (
    <Container>
      <Ellipse
        className="ellipse"
        alt="Ellipse"
        src="https://c.animaapp.com/EuIEJ23i/img/ellipse@2x.png"
      />
      <TextWrapper className="text-wrapper">@jane</TextWrapper>
    </Container>
  );
};

export default MyProfile;
const Container = styled.div`
  height: 13rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Ellipse = styled.img`
  height: 128px;
  width: 128px;
`;

const TextWrapper = styled.div`
  font-family: "Comfortaa", Helvetica;
  font-size: 32px;
  font-weight: 400;
  height: 36px;
  left: 90px;
  letter-spacing: -0.48px;
  line-height: normal;
  text-align: center;
  white-space: nowrap;
`;
