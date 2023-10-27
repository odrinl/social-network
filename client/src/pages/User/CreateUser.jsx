import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";
import TEST_ID from "./CreateUser.testid";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordValid = () => {
    const validPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return validPattern.test(password);
  };
  const isPasswordConfirmValid = () => {
    return confirmPassword === password && confirmPassword !== "";
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const onSuccess = () => {
    setName("");
    setEmail("");
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess
  );
  useEffect(() => {
    return cancelFetch;
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: { name, email, password } }),
    });
  };
  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <div data-testid={TEST_ID.errorContainer}>
        Error while trying to create user: {error.toString()}
      </div>
    );
  } else if (isLoading) {
    statusComponent = (
      <div data-testid={TEST_ID.loadingContainer}>Creating user....</div>
    );
  }
  return (
    <FormContainer>
      <Container>
        <Heading>
          <span className="white">SIGN</span> <span className="black">UP</span>
        </Heading>
        <form onSubmit={handleSubmit}>
          <InputField>
            <StyledInput
              name="username"
              placeholder="Username"
              value={name}
              onChange={(value) => setName(value)}
              data-testid={TEST_ID.nameInput}
            />
            <GuideList>
              <li>No spaces in the username</li>
            </GuideList>
          </InputField>
          <InputField>
            <StyledInput
              name="email"
              value={email}
              placeholder="Email"
              onChange={(value) => setEmail(value)}
              data-testid={TEST_ID.emailInput}
            />
            <GuideList>
              <li>Enter a valid email</li>
            </GuideList>
          </InputField>
          <InputField>
            <StyledInput
              name="password"
              value={password}
              placeholder="Password"
              onChange={(value) => setPassword(value)}
              type={showPassword ? "text" : "password"}
              style={{
                backgroundColor:
                  password.trim() !== ""
                    ? isPasswordValid()
                      ? "rgba(217, 250, 190, 0.5)"
                      : "rgba(255, 96, 82, 0.5)"
                    : "auto",
              }}
              data-testid={TEST_ID.emailInput}
            />
            <IconWrapper onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </IconWrapper>
            <GuideList>
              <li>At least 8 characters including letters and numbers</li>
            </GuideList>
          </InputField>
          <InputField>
            <StyledInput
              name="confirm password"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={(value) => setConfirmPassword(value)}
              type={showPassword ? "text" : "password"}
              style={{
                backgroundColor:
                  confirmPassword.trim() !== ""
                    ? isPasswordConfirmValid()
                      ? "rgba(217, 250, 190, 0.5)"
                      : "rgba(255, 96, 82, 0.5)"
                    : "auto",
              }}
              data-testid={TEST_ID.emailInput}
            />
            <IconWrapper onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </IconWrapper>
            <GuideList>
              <li>Re-Enter your password</li>
            </GuideList>
          </InputField>
          <StyledButton type="submit" data-testid={TEST_ID.submitButton}>
            Submit
          </StyledButton>
        </form>
        {statusComponent}
      </Container>
    </FormContainer>
  );
};
export default CreateUser;
// Styled components
const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  @media (max-width: 768px) {
  }
`;
const Container = styled.div`
  min-width: 40%;
  height: 85vh;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  padding: 40px;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  border: 3px solid #90467f;
  @media (max-width: 768px) {
    width: 80%;
  }
`;
const Heading = styled.h1`
  font-size: 40px;
  color: #3b4a47;
  font-weight: 800;
  font-family: Inter;
  text-shadow: 0px 0px 30px rgba(0, 0, 0, 0.4);
  z-index: 2;
  .white {
    color: #3b4a47;
  }
  .black {
    color: #90467f;
  }
  @media (max-width: 768px) {
  }
`;
const InputField = styled.div`
  width: 100%;
  margin: 20px auto 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: left;
  font-size: 15px;
`;
const GuideList = styled.ul`
  margin: 5px auto 5px 0px;
  display: flex;
  font-color: gray;
  color: gray;
  list-style: none;
`;
const StyledInput = styled(Input)`
  height: 50px;
  width: 100%;
  font-size: 17px;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid rgba(102, 102, 102, 0.35);
  padding: 5px;
  &:focus {
    outline: none;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
  @media (max-width: 768px) {
    height: 40px;
  }
`;
const StyledButton = styled.button`
  position: relative;
  padding: 15px 15px;
  width: 14rem;
  border-radius: 1rem;
  border: 0 !important;
  outline: 0 !important;
  background: #3b4a47;
  font-size: 1.5rem;
  margin-top: 25px;
  color: white;
  cursor: pointer;
  font-weight: bolder;
  &:hover {
    box-shadow: 0 0 10px 5px rgba(144, 70, 127, 0.5);
    transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  }
`;
const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 35%;
  transform: translateY(-50%);
  cursor: pointer;
  svg {
    font-size: 1.5em;
    color: #777;
    transition: color 0.3s;
    &:hover {
      color: #0099ff;
    }
  }
`;
