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
  }
  const isPasswordConfirmValid = () => {
    return confirmPassword === password && confirmPassword !== "";
  }
  const togglePasswordVisibility = ()=>{
    setShowPassword(prevState=> !prevState);
  }
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
    <Container>
      <Title>AZIEL NET</Title>
      <div data-testid={TEST_ID.container}>
        <h1>SIGN UP</h1>
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
                      ? "rgba(0, 255, 0, 0.5)"
                      : "rgba(255, 0, 0, 0.5)"
                    : "auto",
                color: "white",
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
                      ? "rgba(0, 255, 0, 0.5)"
                      : "rgba(255, 0, 0, 0.5)"
                    : "auto",
                color: "white",
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
      </div>
    </Container>
  );
};

export default CreateUser;

// Styled components 
const Container = styled.div`
display: flex;
flex-direction: column;
text-align: center;
max-width: 400px;
margin: 0 auto;
padding: 20px;
width: 591px;
height: auto;
border-radius: 10px;
border: 1px solid #000;
`;
const Title = styled.div`
margin: 0 auto;
width: 348px;
height: 86px;
color: #90467F;
font-family: Inter;
font-size: 64px;
font-style: normal;
font-weight: 800;
line-height: normal;
`;
const InputField = styled.div`
margin: 10px auto 10px;
display: flex;
max-width: 100%;
flex-direction: column;
align-items: left;
font-size:15px
`;
const GuideList = styled.ul`
margin:5px auto 5px 0px;
display:flex;
font-color:gray;
color: gray;
list-style: none;
`
const StyledInput = styled(Input)`
height: 40px;
align-self: stretch;
border-radius: 12px;
border: 1px solid rgba(102, 102, 102, 0.35);
padding:5px
`
const StyledButton = styled.button`
width: 185.867px;
height: 54.5px;
flex-shrink: 0;
border-radius: 10px;
background: #90467F;
color: white;
font-size: 20px;
cursor: pointer;
`
const IconWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;