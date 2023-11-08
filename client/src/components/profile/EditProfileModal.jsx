// import React, { useState } from "react";
// import Modal from "react-modal";
// import styled from "styled-components";

// const EditProfileModal = ({ isOpen, onClose, onSave, user }) => {
//   const [formData, setFormData] = useState({ ...user });
//   const [selectedProfileImage, setSelectedProfileImage] = useState(null);
//   const [selectedCoverImage, setSelectedCoverImage] = useState(null);

//   const handleProfileImageSelect = (e) => {
//     const file = e.target.files[0];
//     setSelectedProfileImage(URL.createObjectURL(file));
//   };

//   const handleCoverImageSelect = (e) => {
//     const file = e.target.files[0];
//     setSelectedCoverImage(URL.createObjectURL(file));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSaveProfile = () => {
//     const updatedUser = {
//       ...formData,
//       profilePic: selectedProfileImage,
//       coverPhoto: selectedCoverImage,
//     };
//     onSave(updatedUser);
//     onClose();
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       style={{
//         overlay: {
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//         },
//         content: {
//           padding: "20px",
//           top: "50%",
//           left: "50%",
//           right: "auto",
//           bottom: "auto",
//           transform: "translate(-50%, -50%)",
//           border: "none",
//         },
//       }}
//     >
//       <ModalContainer>
//         <Content>
//           <h2>Edit Profile</h2>
//           <ImageInputWrapper>
//             <ImageInputLabel>
//               Upload Profile Image:
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleProfileImageSelect}
//               />
//             </ImageInputLabel>
//             {selectedProfileImage && (
//               <ImagePreview src={selectedProfileImage} alt="Selected Profile" />
//             )}
//           </ImageInputWrapper>
//           <ImageInputWrapper>
//             <ImageInputLabel>
//               Upload Cover Image:
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleCoverImageSelect}
//               />
//             </ImageInputLabel>
//             {selectedCoverImage && (
//               <ImagePreview src={selectedCoverImage} alt="Selected Cover" />
//             )}
//           </ImageInputWrapper>
//           <Input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             placeholder="First Name"
//           />
//           <Input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//           />
//           <TextArea
//             name="bio"
//             value={formData.bio}
//             onChange={handleChange}
//             placeholder="Bio"
//           />
//           {/* Additional fields for user information */}
//           <Input
//             type="text"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleChange}
//             placeholder="Date of Birth"
//           />
//           <Input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             placeholder="Address"
//           />
//           <Input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             placeholder="City"
//           />
//           <Input
//             type="text"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             placeholder="State"
//           />
//           <Input
//             type="text"
//             name="postalCode"
//             value={formData.postalCode}
//             onChange={handleChange}
//             placeholder="Postal Code"
//           />
//           <Input
//             type="text"
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//             placeholder="Country"
//           />
//           <Input
//             type="text"
//             name="nationality"
//             value={formData.nationality}
//             onChange={handleChange}
//             placeholder="Nationality"
//           />
//           <Input
//             type="text"
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             placeholder="Status"
//           />
//           <Input
//             type="text"
//             name="hobbies"
//             value={formData.hobbies}
//             onChange={handleChange}
//             placeholder="Hobbies"
//           />

//           <ButtonContainer>
//             <CancelButton onClick={onClose}>Cancel</CancelButton>
//             <SaveButton onClick={handleSaveProfile}>Save</SaveButton>
//           </ButtonContainer>
//         </Content>
//       </ModalContainer>
//     </Modal>
//   );
// };

// const ModalContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const Content = styled.div`
//   background: #fff;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   max-width: 400px;
//   text-align: center;

//   h2 {
//     font-size: 24px;
//     margin-bottom: 20px;
//     color: #1da1f2;
//   }
// `;

// const ImageInputWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const ImageInputLabel = styled.label`
//   margin: 10px 0;
// `;

// const ImagePreview = styled.img`
//   max-width: 100%;
//   height: auto;
//   margin-bottom: 20px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   margin-bottom: 20px;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   margin-bottom: 20px;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const SaveButton = styled.button`
//   padding: 10px 20px;
//   background-color: #1da1f2;
//   color: #fff;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   font-size: 16px;
// `;

// const CancelButton = styled.button`
//   padding: 10px 20px;
//   background-color: #e1e8ed;
//   color: #000;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   font-size: 16px;
// `;

// export default EditProfileModal;
