/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

const ImageEditModal = ({ isOpen, onClose, onSave }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleSave = () => {
    onSave(selectedImage);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          border: "none",
          background: "none",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
        },
      }}
    >
      <ModalContainer>
        <Content>
          <h2>Update picture</h2>
          <input type="file" accept="image/*" onChange={handleImageSelect} />
          {selectedImage && <img src={selectedImage} alt="Selected" />}
          <ButtonContainer>
            <CancelButton onClick={onClose}>Cancel</CancelButton>
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </ButtonContainer>
        </Content>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  background: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #1da1f2;
  }

  input[type="file"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #1da1f2;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #e1e8ed;
  color: #000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
`;

export default ImageEditModal;
