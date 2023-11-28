import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";

import PostUploadModal from "./PostUploadModal";

const CreatePost = ({ onPostCreate }) => {
  const [text, setText] = useState("");
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const onReceived = (response) => {
    setText("");
    onPostCreate(response.post);
  };

  const onSuccess = (response) => {
    console.log("success", response);
    setData(response.user);
  };

  const { performFetch, isLoading } = useFetch("/posts/create", onReceived);
  const { performFetch: performData, cancelData } = useFetch(
    `/users/${userId}`,
    onSuccess
  );

  useEffect(() => {
    performData({
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }, [userId]);
  useEffect(() => {
    return cancelData;
  }, []);

  const handlePostCreate = () => {
    if (text.trim() !== "") {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: userId, text: text }),
      };

      performFetch(options);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <TopArea>
        <ProfilePic
          id="profilePic"
          src={
            data.profilePicture
              ? `${process.env.BASE_SERVER_URL}/uploadImages/${data.profilePicture}`
              : "https://th.bing.com/th/id/OIP.Y6Xo7ozc-rL5UrzUanPlxAHaHa?w=211&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          }
          alt="Profile Pic"
        />
        <Text
          name="user-post"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {showModal && <PostUploadModal onClose={closeModal} />}
      </TopArea>
      <ButtonContainer>
        <IconContainer>
          <img
            width="40"
            height="40"
            src="https://cdn-icons-png.flaticon.com/512/1040/1040241.png"
            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
            onClick={openModal}
            alt="Add Photo Icon"
          />
          <span style={{ marginLeft: "0.5rem" }}> Photo</span>
        </IconContainer>
        <BottomArea>
          <PostButton onClick={handlePostCreate}>Post</PostButton>
        </BottomArea>
      </ButtonContainer>
      {isLoading && <p>Loading...</p>}
    </Container>
  );
};

CreatePost.propTypes = {
  onPostCreate: PropTypes.func.isRequired,
};

export default CreatePost;

const Container = styled.div`
  background-color: #05445e;
  color: white;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding-bottom: 1rem;
`;

const TopArea = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
`;

const BottomArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const IconContainer = styled.div`
  display: flex;
  position: relative;
  top: -40px;
  left: 15%;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
    margin-right: 0.5rem;
    cursor: pointer;
  }

  span {
    font-size: 1rem;
    color: white;
  }
  @media (max-width: 500px) {
    position: relative;
    top: 5px;
    left: 1%;
  }
  @media (min-width: 768px) {
    position: relative;
    top: -40px;
    left: 25%;
  }
`;

const ProfilePic = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 5px solid #fff;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(27, 131, 166, 0.6);
`;

const Text = styled.textarea`
  margin-top: 0.5rem;
  display: flex;
  flex-grow: 1;
  background-color: #ffffff;
  border-radius: 5.97px;
  height: 41px;
  resize: none;
  margin-left: 0.5rem;
  font-family: var(--font-family);
  font-size: 1rem;
  text-align: left;
  padding: 0.6rem;
`;

const PostButton = styled.button`
  background-color: #f0f7ff;
  color: #05445e;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  height: 31px;
  width: 122px;
`;
