import React,{useState} from "react";
import styled from "styled-components";

const Friends = () => {
const [endpoint, setEndpoint] = useState("")

const endPointHandler = ()=>{
}
  return (
    <Container>
      <div className="container block">
        <h2>Friends</h2>
      </div>
      <SearchDiv>
        <search>
          </search>
      </SearchDiv>
      <FriendsNav>
        <ul>
          <li onClick={()=>{
            setEndpoint("")
            endPointHandler()
          }
        }>Friends{endpoint}</li>
          <li onClick={setEndpoint("/friends/friend-request:id${}")}>Friends Requests</li>
          <li>Sent Requests</li>
        </ul>
      </FriendsNav>
    </Container>
  );
};

export default Friends;
const Container = styled.div`
  height: 20rem;
`;


const FriendsNav = styled.div`
`

const SearchDiv = styled.div`
`