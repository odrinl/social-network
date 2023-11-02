import React from "react";
import styled from "styled-components";

const FriendSideSection = () => {
  return (
    <Container>
      <Item>
        <FriendAvatar
          src="https://c.animaapp.com/shx7UmdF/img/ellipse-10@2x.png"
          alt="Kierra Gentry"
        />
        <FriendName>Kierra Gentry</FriendName>
      </Item>
      <Item>
        <FriendAvatar
          src="https://c.animaapp.com/shx7UmdF/img/ellipse-12@2x.png"
          alt="Cierra Vega"
        />
        <FriendName>Cierra Vega</FriendName>
      </Item>
      <Item>
        <FriendAvatar
          src="https://c.animaapp.com/shx7UmdF/img/ellipse-16@2x.png"
          alt="Alvaro Mcgee"
        />
        <FriendName>Alvaro Mcgee</FriendName>
      </Item>
      <Item>
        <FriendAvatar
          src="https://c.animaapp.com/shx7UmdF/img/ellipse-10@2x.png"
          alt="Kierra Gentry"
        />
        <FriendName>Kierra Gentry</FriendName>
      </Item>
      <Item>
        <FriendAvatar
          src="https://c.animaapp.com/shx7UmdF/img/ellipse-12@2x.png"
          alt="Cierra Vega"
        />
        <FriendName>Cierra Vega</FriendName>
      </Item>
      <Item>
        <FriendAvatar
          src="https://c.animaapp.com/shx7UmdF/img/ellipse-16@2x.png"
          alt="Alvaro Mcgee"
        />
        <FriendName>Alvaro Mcgee</FriendName>
      </Item>
      <Item>
        <FriendAvatar
          src="https://c.animaapp.com/shx7UmdF/img/ellipse-10@2x.png"
          alt="Kierra Gentry"
        />
        <FriendName>Kierra Gentry</FriendName>
      </Item>
      <Item>
        <FriendAvatar
          src="https://c.animaapp.com/shx7UmdF/img/ellipse-12@2x.png"
          alt="Cierra Vega"
        />
        <FriendName>Cierra Vega</FriendName>
      </Item>
      <Item>
        <FriendAvatar
          src="https://c.animaapp.com/shx7UmdF/img/ellipse-16@2x.png"
          alt="Alvaro Mcgee"
        />
        <FriendName>Alvaro Mcgee</FriendName>
      </Item>
    </Container>
  );
};

export default FriendSideSection;
const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  padding: 0 2rem;
`;

const FriendAvatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const FriendName = styled.div`
  margin-left: 2rem;
  font-weight: normal;
`;
