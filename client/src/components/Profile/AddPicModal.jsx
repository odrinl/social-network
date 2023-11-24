import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const AddPicModal = ({ isOpen, type, onClose, onSave }) => {
  const [newImage, setNewImage] = useState("");
  const [file, setFile] = useState(null);

  const handleSave = () => {
    onSave(newImage || file);
    onClose();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setNewImage("");
    }
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Edit {type === "profile" ? "Profile" : "Cover"} Photo</h2>
        <InputLabel>
          Image URL:
          <Input
            type="text"
            placeholder="Enter new image URL"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
          />
        </InputLabel>
        <InputLabel>
          or Upload File:
          <FileInput type="file" onChange={handleFileChange} />
        </InputLabel>
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </ModalContent>
    </ModalContainer>
  );
};

AddPicModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

const ModalContainer = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
  @media (max-width: 768px) {
    width: 50%;
  }
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
`;

const InputLabel = styled.label`
  display: block;
  margin-top: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
`;

const FileInput = styled.input`
  margin-top: 5px;
`;

const SaveButton = styled.button`
  background-color: #1da1f2;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
`;

export default AddPicModal;
