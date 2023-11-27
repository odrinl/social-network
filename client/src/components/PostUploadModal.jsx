import React, { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostUploadModal = ({ onClose }) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState([]);

  const onSuccess = (response) => {
    setData(response.user);
  };

  const { isLoading, performFetch } = useFetch(`/users/${userId}`, onSuccess);

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }, [userId]);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedImage(file);
  };

  const handleModalClose = () => {
    onClose();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    // Check if fileInputRef is defined before clicking
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageClick = () => {
    // Allow users to change the selected image by clicking on it
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Post creation initiated");
    try {
      if (!selectedImage) {
        console.error("Please select an image before submitting.");
        return;
      }

      const formData = new FormData();
      formData.append("postImage", selectedImage);
      formData.append("text", caption);

      const response = await fetch(
        `${process.env.BASE_SERVER_URL}/api/uploads/upload-post-image/${userId}`,
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

        console.log(result);

        onClose();
      } else {
        console.error("Post picture upload failed");
      }
    } catch (error) {
      console.error("Error uploading post picture:", error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <ModalContainer>
        <ModalContent>
          {isLoading && <p>Loading...</p>}
          <ModalHeader>
            <h2>Upload Post</h2>
            <CloseButton onClick={handleModalClose}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseButton>
          </ModalHeader>
          <UserInfo>
            <ProfileImage
              id="profilePic"
              src={
                data.profilePicture
                  ? `${process.env.BASE_SERVER_URL}/uploadImages/${data.profilePicture}`
                  : "https://th.bing.com/th/id/OIP.Y6Xo7ozc-rL5UrzUanPlxAHaHa?w=211&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              }
              alt="Profile Pic"
            />
            <Username>{data.username}</Username>
          </UserInfo>

          <form onSubmit={handleSubmit}>
            <DropContainer
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {selectedImage ? (
                <>
                  <SelectedImage
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    onClick={handleImageClick}
                  />
                </>
              ) : (
                <>
                  <OverlayText>Click or Drop to select image</OverlayText>
                  <HiddenFileInput
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                </>
              )}
            </DropContainer>
            <InputLabel>
              Add Caption:
              <TextArea
                placeholder="Add a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </InputLabel>
            <ButtonContainer>
              <ChangeImageButton onClick={handleClearImage}>
                Change Image
              </ChangeImageButton>
              <SubmitButton type="submit">Submit</SubmitButton>
            </ButtonContainer>
          </form>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

PostUploadModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden; 
  }
`;
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;

  h2 {
    color: #05445e;
    font-size: 24px;
    margin-bottom: 20px;
  }
`;
const CloseButton = styled.span`
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: black;
  cursor: pointer;

  transition: color 0.3s ease;

  &:hover {
    color: #333;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 5px solid #fff;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(27, 131, 166, 0.6);
  margin-right: 0.5rem;
`;

const Username = styled.div`
  font-weight: bold;
  color: black;
`;

const DropContainer = styled.div`
  border: 2px dashed #1877f2;
  border-radius: 8px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    border-color: #053d63;
  }

  input[type="file"] {
    display: none;
  }
`;

const SelectedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const OverlayText = styled.p`
  color: #1877f2;
  margin: 0;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 15px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChangeImageButton = styled.button`
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #f57c00;
  }
`;

const SubmitButton = styled.button`
  background-color: #1877f2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0e5a8a;
  }
`;

export default PostUploadModal;
