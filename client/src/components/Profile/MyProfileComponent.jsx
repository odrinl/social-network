import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import UsersPosts from "./UsersPosts";
import AddPicModal from "./AddPicModal";

export const fakeData = {
  name: "Sophie Walker",
  profilePic:
    "https://th.bing.com/th/id/OIP.vQcH6uRqJd1SIpce-41uUgHaLH?w=146&h=219&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  coverPhoto:
    "https://th.bing.com/th?id=OIP.zcvn4QV1z5E7vQOFDLP6UQHaC2&w=350&h=134&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  friends: 200,
  location: "New York, USA",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam tortor .",
  contact: {
    email: "sophiewalker@example.com",
    phone: "+1234567890",
  },
  posts: [
    {
      text: "Enjoying a sunny day in Central Park!",
      image:
        "https://th.bing.com/th/id/OIP.DJJG679LrTZLkbwNIUzZnAHaE7?w=294&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      likes: 25,
      dislikes: 5,
      date: "2 hours ago",
      comments: [
        {
          author: "Alice",
          text: "Looks amazing!",
        },
        {
          author: "Bob",
          text: "Central Park is lovely.",
        },
        {
          author: "alex",
          text: "i love it.",
        },
      ],
    },
    {
      text: "Dinner with friends at my favorite restaurant.",
      image:
        "https://th.bing.com/th/id/OIP.Kt_l1n44-ioCZ-VN-z5S_AHaE8?w=301&h=201&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      likes: 42,
      dislikes: 8,
      comments: [
        {
          author: "Charlie",
          text: "Yummy!",
        },
      ],
    },
  ],
};

const MyProfileComponent = () => {
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

  return (
    <Container>
      <CoverPhotoContainer>
        <CoverPhoto src={coverPhoto} alt="Cover Photo" />
        <CoverEditButton onClick={() => setShowCoverModal(true)}>
          <FontAwesomeIcon icon={faCamera} />
          Edit Cover Photo
        </CoverEditButton>
      </CoverPhotoContainer>
      <ProfileInfo>
        <ProfilePicContainer>
          <ProfilePic
            src={profilePic}
            alt="Profile Pic"
            onClick={() => setShowProfileModal(true)}
          />
          <CameraIcon onClick={() => setShowProfileModal(true)}>
            <FontAwesomeIcon icon={faCamera} />
          </CameraIcon>
        </ProfilePicContainer>
        <div>
          <h1>{fakeData.name}</h1>
          <p>{`${fakeData.friends} Friends`}</p>
        </div>
        <EditProfileButton>
          <FontAwesomeIcon icon={faPencilAlt} />
          Edit Profile
        </EditProfileButton>
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
      <UsersPosts />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 18px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0 !important;
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

  &:hover 
    background-color: rgba(0, 0, 0, 0.);
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

const EditProfileButton = styled.div`
  background-color: #1da1f2;
  padding: 10px;
  width: 140px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  border-radius: 0.4rem;
  color: #fff;
  transition: background-color 0.3s;
  margin-left: auto;

  svg {
    font-size: 20px;
    margin-right: 8px;
  }

  &:hover {
    background-color: #0099e5;
  }
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

export default MyProfileComponent;
