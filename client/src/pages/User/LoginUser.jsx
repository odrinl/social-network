import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import styled from "styled-components";

import "../../index.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";
function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const onSuccess = (response) => {
    setEmail("");
    setPassword("");
    setLoggedIn(true);
    localStorage.setItem("token", response.token);
  };
  const { isLoading, error, performFetch } = useFetch("/auth/login", onSuccess);

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
      <FormContainer>
        <FormMain>
          <Heading>
            <span className="#3b4a47">LOG</span>{" "}
            <span className="black">IN</span>
          </Heading>
          <form onSubmit={handleLogin}>
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
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </PasswordToggle>
            </InputContainer>
            <SubmitButton id="button">LOG IN</SubmitButton>
            <RememberMe>
              <input type="checkbox" id="rememberMe" name="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </RememberMe>
            <ForgotLink className="forgotLink">
              <FaLock style={{ color: "black", marginRight: "5px" }} /> Forgot
              password?
            </ForgotLink>
          </form>
          {error && <ErrorText>{error}</ErrorText>}
          {isLoading && <p>Loading...</p>}
        </FormMain>
      </FormContainer>
    );
  }
}
const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  @media (max-width: 768px) {
    height: 100vh;
  }
`;
const FormMain = styled.div`
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
    color: white;
  }
  .black {
    color: #90467f;
  }
  @media (max-width: 768px) {
  }
`;
const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  margin-top: 5rem;
  width: 100%;
  @media (max-width: 768px) {
    margin-top: 1.5rem;
    width: 100%;
  }
`;
const InputField = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  box-shadow: 0px 0px 70px rgba(0, 0, 0, 0.3);
  border-bottom: 2px solid rgb(173, 173, 173);
  margin: 30px 0;
  font-size: 1.4rem;
  font-weight: 500;
  box-sizing: border-box;
  padding-left: 30px;
  border-radius: 1rem;
  transition: border-bottom 0.3s, box-shadow 0.3s;
  @media (max-width: 768px) {
    height: 50px;
    margin: 15px 0;
    font-size: 1rem;
  }
  &:focus {
    outline: none;
    border-bottom: 3px solid rgb(199, 114, 255);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
  &:hover {
    border-bottom: 3px solid #ff0090;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
`;
const PasswordToggle = styled.div`
  position: absolute;
  right: 10px;
  top: 75%;
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
  z-index: 2;
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
  box-shadow: 0px 0px 70px rgba(0, 0, 0, 0.9);
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
    .SubmitButton:active {
      box-shadow: none;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 15px;
    font-size: 1.2rem;
  }
`;
const ErrorText = styled.p`
  color: red;
  font-size: 1.4rem;
  margin-top: 1rem;
`;
const RememberMe = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0;
  font-size: 1.4em;
  font-weight: bolder;
  color: #939393;
  input[type="checkbox"] {
    display: none;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 15px 0;
  }
  label {
    position: relative;
    cursor: pointer;
    padding-left: 30px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 12px;
      height: 12px;
      border: 2px solid #90467f;
      border-radius: 3px;
      background-color: white;
    }
    &:after {
      content: "";
      position: absolute;
      left: 6px;
      top: 6px;
      width: 8px;
      height: 8px;
      border: solid #0099ff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      display: none;
    }
  }
  input[type="checkbox"]:checked + label:before {
    background-color: #0099ff;
    border: 2px solid #0099ff;
  }
  input[type="checkbox"]:checked + label:after {
    display: block;
  }
`;
const ForgotLink = styled.a`
  z-index: 2;
  cursor: pointer;
  position: relative;
  font-size: 1.4em;
  font-weight: bolder;
  color: #0099ff;
  margin: 30px 0;
  text-decoration: none;
  padding: 8px 0px;
  border-radius: 20px;
  transition: color 0.3s;
  &:hover {
    color: #166fe5;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 15px 0;
  }
`;
export default LoginUser;
