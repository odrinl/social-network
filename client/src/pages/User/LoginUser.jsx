import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import styled from "styled-components";

import "../../index.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";
function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return cancelFetch;
  }, []);

  const onSuccess = (response) => {
    setEmail("");
    setPassword("");
    setLoggedIn(true);
    localStorage.setItem("token", response.token);
    localStorage.setItem("userId", response.user._id);
    localStorage.setItem("username", response.user.username);
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/auth/login",
    onSuccess
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      performFetch({
        error: "Email and password are required",
      });
      return;
    }
    performFetch({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loggedIn) {
    navigate("/home");
    return null;
  } else {
    return (
      <FormWrapper>
        <FormContainer>
          <FormMain>
            <Heading>
              <span className="#3b4a47">LOG</span>{" "}
              <span className="black">IN</span>
            </Heading>
            <Form onSubmit={handleLogin}>
              <InputContainer>
                <InputField
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email"
                  aria-required="true"
                />
                <InputField
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Password"
                  aria-required="true"
                />
                <PasswordToggle onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </PasswordToggle>
              </InputContainer>
              <SubmitButton id="button">LOG IN</SubmitButton>
              <RememberMe>
                <StyledCheckboxLabel htmlFor="remember">
                  <StyledCheckbox
                    type="checkbox"
                    id="remember"
                    name="remember"
                  />
                  Remember me
                </StyledCheckboxLabel>
              </RememberMe>
              <ForgotLink className="forgotLink">
                <FaLock style={{ color: "black", marginRight: "5px" }} /> Forgot
                password?
              </ForgotLink>
            </Form>
            {error && <ErrorText>{error}</ErrorText>}
            {isLoading && <p>Loading...</p>}
          </FormMain>
        </FormContainer>
      </FormWrapper>
    );
  }
}
export default LoginUser;

const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  min-width: 350px;
  justify-content: center;
`;

const FormMain = styled.div`
  display: flex;
  width: 450px;
  margin: 1rem;
  flex-direction: column;
  align-items: center;
  padding: 2rem 3.5rem;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border-radius: 20px;
  border: 3px solid #90467f;
`;

const Heading = styled.h1`
  font-size: 40px;
  margin-top: 1rem;
  color: #3b4a47;
  font-weight: 800;
  font-family: Inter;
  .white {
    color: white;
  }
  .black {
    color: #90467f;
  }
`;

const Form = styled.form`
  display: flex;
  margin: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const InputContainer = styled.div`
  position: relative;

  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  font-size: 15px;
`;

const InputField = styled.input`
  height: 50px;
  font-size: 17px;
  width: 100%;
  margin: 30px 0;
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
`;

const PasswordToggle = styled.div`
  position: absolute;
  right: 10px;
  top: 76%;
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

const SubmitButton = styled.button`
  height: 50px;
  width: 12rem;
  border-radius: 12px;
  border: 0;
  outline: 0;
  background: #90467f;
  font-size: 17px;
  margin-top: 1.5rem;
  color: white;
  cursor: pointer;
  font-weight: bolder;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
    .SubmitButton:active {
      box-shadow: none;
    }
  }
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0;
  font-size: 1rem;
  font-weight: bolder;
  color: #939393;
`;

const StyledCheckboxLabel = styled.label`
  display: flex;
  align-items: flex-end;
`;

const StyledCheckbox = styled.input`
  margin-right: 1rem;
  cursor: pointer;
  width: 19px;
  height: 19px;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 1rem;
`;

const ForgotLink = styled.a`
  cursor: pointer;
  position: relative;
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: bolder;
  color: #0099ff;
  text-decoration: none;
  border-radius: 20px;
  transition: color 0.3s;
  &:hover {
    color: #166fe5;
  }
`;
