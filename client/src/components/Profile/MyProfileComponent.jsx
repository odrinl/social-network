import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import UsersPosts from "./UsersPosts";
import { FaCamera } from "react-icons/fa";

export const fakeData = {
  profilePic:
    "https://th.bing.com/th/id/OIP.yhqkR9B2hKbtwwZ8bPNbQQHaHw?w=200&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  coverPhoto:
    "https://th.bing.com/th/id/OIP.Tn2c_lREpwhQGXrvQ3aRgwHaHa?pid=ImgDet&w=200&h=200&c=7&dpr=1,3",
  username: "robert",
};

const placeholderCoverPhoto =
  "https://via.placeholder.com/1000x240?text=Cover+Photo";

const MyProfileComponent = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const [friendsNumber, setFriendsNumber] = useState(null);
  const fileInputRef = useRef(null);

  const onSuccess = (response) => {
    setData(response.user);
  };

  const onGetting = (response) => {
    setFriendsNumber(response.friendsNumber);
  };

  const { performFetch: fetchFriendsNumber, cancelFetch: cancelFriendsNumber } =
    useFetch(`/users/${userId}/friendsNumber`, onGetting);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/users/${userId}`,
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);
  useEffect(() => {
    return cancelFriendsNumber;
  }, []);

  useEffect(() => {
    fetchFriendsNumber({
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
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

  const handleProfilePictureUpload = () => {
    // Programmatically trigger the file input click event
    fileInputRef.current.click();
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);

    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);

      try {
        const response = await fetch(
          `${process.env.BASE_SERVER_URL}/api/uploads/upload-profile-picture/${userId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();

          document.getElementById(
            "profilePic"
          ).src = `${process.env.BASE_SERVER_URL}${result.profilePictureUrl}`;
        } else {
          console.error("Profile picture upload failed");
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  const handleCoverPhotoUpload = () => {
    // Programmatically trigger the file input click event
    fileInputRef.current.click();
  };

  const handleCoverFileInputChange = async (event) => {
    const file = event.target.files[0];
    console.log("Selected cover photo file:", file);

    if (file) {
      const formData = new FormData();
      formData.append("coverPicture", file);

      try {
        const response = await fetch(
          `${process.env.BASE_SERVER_URL}/api/uploads/upload-cover-picture/${userId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();

          document.getElementById(
            "coverPhoto"
          ).src = `${process.env.BASE_SERVER_URL}${result.coverPictureUrl}`;
        } else {
          console.error("Cover photo upload failed");
        }
      } catch (error) {
        console.error("Error uploading cover photo:", error);
      }
    }
  };

  return (
    <Container>
      <ScrollableContainer>
        {isLoading && <LoadingDiv>Loading....</LoadingDiv>}
        {!isLoading && error && (
          <ErrorDiv>
            Error while trying to get data from the server: {error.toString()}
          </ErrorDiv>
        )}
        {!isLoading && !error && (
          <>
            <CoverPhotoContainer>
              <CoverPhoto
                id="coverPhoto"
                src={
                  data.coverPicture
                    ? `${process.env.BASE_SERVER_URL}/uploadImages/${data.coverPicture}`
                    : placeholderCoverPhoto
                }
                alt="Cover Photo"
              />
              <CoverEditButton onClick={handleCoverPhotoUpload}>
                <FaCamera />
                Edit Cover Photo
              </CoverEditButton>
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleCoverFileInputChange}
              />
            </CoverPhotoContainer>

            <ProfileInfo>
              <ProfilePicContainer>
                <ProfilePic
                  id="profilePic"
                  src={
                    data.profilePicture
                      ? `${process.env.BASE_SERVER_URL}/uploadImages/${data.profilePicture}`
                      : fakeData.profilePic
                  }
                  alt="Profile Pic"
                />
                <CameraIcon onClick={handleProfilePictureUpload}>
                  <FaCamera />
                </CameraIcon>
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
              </ProfilePicContainer>
              {
                <div>
                  <h1>{data.username}</h1>
                  <p>{`${friendsNumber} Friends`}</p>
                </div>
              }
            </ProfileInfo>
          </>
        )}
        <UsersPosts />
      </ScrollableContainer>
    </Container>
  );
};

export default MyProfileComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 51rem;
  margin-top: 1.5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #05445e, #d4f1f4, #05445e);
  }
`;
const CameraIcon = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #fff;
  border-radius: 50%;
  padding: 4px;
  svg {
    font-size: 19px;
  }
`;
const ScrollableContainer = styled.div`
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0em;
  }
  &::-webkit-scrollbar-thumb {
    background: #d4f1f4;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #d4f1f4;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const CoverEditButton = styled.div`
  position: absolute;
  top: 190px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  border-radius: 0.4rem;
  color: #fff;
  transition: background-color 0.3s;
  svg {
    font-size: 20px;
    margin-right: 8px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.7); /* Added opening curly brace here */
  }
`;
const CoverPhotoContainer = styled.div`
  position: relative;
`;

const CoverPhoto = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 0.8rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const ProfilePicContainer = styled.div`
  position: relative;
`;

const ProfilePic = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 5px solid #fff;
  object-fit: cover;
  margin-top: -75px;
  margin-left: 20px;
  box-shadow: 0 0 10px rgba(27, 131, 166, 0.6);
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;

  h1 {
    font-size: 17px;
    margin-right: 10px;
  }

  p {
    color: #666;
    font-size: 14px;
  }
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
