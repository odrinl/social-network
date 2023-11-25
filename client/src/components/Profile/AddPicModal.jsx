import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const AddPicModal = ({ isOpen, type, onClose, onSave }) => {
  const [newImage, setNewImage] = useState("");
  const [file, setFile] = useState(null);

  const route = `/uploads/upload-profile-picture/${userId}`;
  const onSuccess = (data) => {
    console.log("Success:", data);
    if (data.success) {
      onSave(data.profilePictureUrl);
      onClose();
    } else {
      console.error("Error uploading file:", data.error);
    }
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    route,
    onSuccess
  );

  const handleSave = async () => {
    if (newImage) {
      onSave(newImage);
      onClose();
    } else if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);

      performFetch({
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setNewImage("");
    }
  };

  useEffect(() => {
    return cancelFetch;
  }, [userId]);

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
        <SaveButton onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </SaveButton>
        {error && <ErrorLabel>{error}</ErrorLabel>}
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

const ErrorLabel = styled.label`
  display: block;
  margin-top: 15px;
  color: red;
  font-size: 14px;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
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
