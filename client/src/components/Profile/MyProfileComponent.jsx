import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import UsersPosts from "./UsersPosts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import AddPicModal from "./AddPicModal";

export const fakeData = {
  username: "Sophie",
  friends: 2,
  profilePic:
    "https://th.bing.com/th/id/OIP.vQcH6uRqJd1SIpce-41uUgHaLH?w=146&h=219&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  coverPhoto:
    "https://th.bing.com/th?id=OIP.zcvn4QV1z5E7vQOFDLP6UQHaC2&w=350&h=134&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
};

const placeholderProfilePic =
  "https://via.placeholder.com/140x140?text=Profile+Pic";
const placeholderCoverPhoto =
  "https://via.placeholder.com/1000x240?text=Cover+Photo";

const MyProfileComponent = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const [friendsNumber, setFriendsNumber] = useState(null);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [profilePic, setProfilePic] = useState(fakeData.profilePic);
  const [coverPhoto, setCoverPhoto] = useState(fakeData.coverPhoto);

  const handleSaveProfilePic = (newProfilePic) => {
    setProfilePic(newProfilePic);
  };

  const handleSaveCoverPhoto = (newCoverPhoto) => {
    setCoverPhoto(newCoverPhoto);
  };

  const onSuccessProfilePic = (data) => {
    console.log("Profile picture data:", data);

    // Check if the success property is true and the profilePictureUrl is present
    if (data.success && data.profilePictureUrl) {
      // Assuming the server provides the complete URL, you can set it directly
      setProfilePic(`http://localhost:5000${data.profilePictureUrl}`);
    } else {
      console.error(
        "Error fetching profile picture. Invalid response format:",
        data
      );
    }
  };

  const onSuccess = (response) => {
    setData(response);
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
  const { performFetch: fetchProfilePic, cancelFetch: cancelProfilePic } =
    useFetch(`/get-profile-picture/${userId}`, onSuccessProfilePic, (error) => {
      console.error("Error fetching profile picture:", error);
    });

  useEffect(() => {
    return cancelFetch;
  }, []);
  useEffect(() => {
    return cancelFriendsNumber;
  }, []);
  useEffect(() => {
    return cancelProfilePic;
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

  useEffect(() => {
    fetchProfilePic({
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }, [userId]);

  return (
    <Container>
      <ScrollableContainer>
        {isLoading && <LoadingDiv>Loading....</LoadingDiv>}
        {!isLoading && error && (
          <ErrorDiv>
            Error while trying to get data from the server: {error.toString()}
          </ErrorDiv>
        )}
        {!isLoading && !error && data.user && (
          <>
            <CoverPhotoContainer>
              {coverPhoto ? (
                <CoverPhoto src={coverPhoto} alt="Cover Photo" />
              ) : (
                <CoverPhoto
                  src={placeholderCoverPhoto}
                  alt="Placeholder Cover Photo"
                />
              )}
              <CoverEditButton onClick={() => setShowCoverModal(true)}>
                Edit Cover Photo
              </CoverEditButton>
            </CoverPhotoContainer>
            <ProfileInfo>
              <ProfilePicContainer>
                {profilePic ? (
                  <ProfilePic
                    src={profilePic || placeholderProfilePic}
                    alt="Profile Pic"
                    onClick={() => setShowProfileModal(true)}
                  />
                ) : (
                  <ProfilePic
                    src={placeholderProfilePic}
                    alt="Placeholder Profile Pic"
                    onClick={() => setShowProfileModal(true)}
                  />
                )}

                <CameraIcon onClick={() => setShowProfileModal(true)}>
                  <FontAwesomeIcon icon={faCamera} />
                </CameraIcon>
              </ProfilePicContainer>

              <div>
                <h1>@ {data.user.username}</h1>
                <p>{`${friendsNumber} Friends`}</p>
              </div>
              {/* <EditProfileButton>
                <FontAwesomeIcon icon={FaPencilAlt} />
                Edit Profile
              </EditProfileButton> */}
            </ProfileInfo>
            {showProfileModal && (
              <AddPicModal
                isOpen={showProfileModal}
                type="profile"
                onClose={() => setShowProfileModal(false)}
                onSave={handleSaveProfilePic}
              />
            )}
            {showCoverModal && (
              <AddPicModal
                isOpen={showCoverModal}
                type="cover"
                onClose={() => setShowCoverModal(false)}
                onSave={handleSaveCoverPhoto}
              />
            )}
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

// const EditProfileButton = styled.div`
//   background-color: #1da1f2;
//   padding: 10px;
//   width: 140px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 16px;
//   font-weight: bold;
//   border-radius: 0.4rem;
//   color: #fff;
//   transition: background-color 0.3s;
//   margin-left: auto;
//   svg {
//     font-size: 20px;
//     margin-right: 8px;
//   }
//   &:hover {
//     background-color: #0099e5;
//   }
// `;

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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
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
