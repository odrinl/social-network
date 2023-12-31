import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";

const MyProfileSideSection = () => {
  const [data, setData] = useState({});

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const onSuccess = (response) => {
    setData(response.user);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/users/${userId}`,
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }, [userId]);

  return (
    <Container>
      <ProfilePicContainer>
        <ProfilePic
          id="profilePic"
          src={
            data.profilePicture
              ? `${process.env.BASE_SERVER_URL}/uploadImages/${data.profilePicture}`
              : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          }
          alt="Profile Pic"
        />
      </ProfilePicContainer>
      {isLoading && <LoadingDiv>Loading....</LoadingDiv>}
      {!isLoading && error && (
        <ErrorDiv>
          Error while trying to get data from the server: {error.toString()}
        </ErrorDiv>
      )}
      {!isLoading && !error && <TextWrapper>{data.username}</TextWrapper>}
    </Container>
  );
};

export default MyProfileSideSection;

const Container = styled.div`
  height: 13rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const TextWrapper = styled.div`
  font-family: "Comfortaa", Helvetica;
  font-size: 32px;
  font-weight: bolder;
  color: #05445e;
  height: 36px;
  left: 90px;
  letter-spacing: -0.48px;
  line-height: normal;
  text-align: center;
  white-space: nowrap;
`;

const ProfilePicContainer = styled.div`
  position: relative;
`;

const ProfilePic = styled.img`
  position: relative;
  left: 5px;
  width: 150px;
  height: 150px;
  border-radius: 30%;
  border: 5px solid #fff;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(27, 131, 166, 0.6);
`;

const LoadingDiv = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const ErrorDiv = styled.div`
  background-color: #ffe4e1;
  color: #e74c3c;
  padding: 8px 16px;
  border: 1px solid #e74c3c;
  border-radius: 4px;
  margin: 8px 0;
`;
