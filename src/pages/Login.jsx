import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  return (
    <LoginContainer>
      <Helmet>
        <title>Aibatt | Login</title>
      </Helmet>
      <FormOuter>
        <FormInner>
          <img src="images/bat.png" alt="" />
          <p>Login</p>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Username" required />
              <input type="password" placeholder="Password" required />
              <button>Sign In</button>
            </form>
          </div>
          {err && <p className="error">Something went wrong</p>}

          <span>
            Dont have an account? <Link to="/register">Register</Link>
          </span>
        </FormInner>
      </FormOuter>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
`;

const FormOuter = styled.div`
  height: 100%;
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  @media screen and (max-width: 577px) {
    padding: 10px;
  }
`;

const FormInner = styled.div`
  background-image: radial-gradient(
    circle 732px at -23.9% -25.1%,
    rgba(30, 39, 107, 1) 6.1%,
    rgba(188, 104, 142, 1) 100.2%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  max-height: 700px;
  justify-content: space-between;
  width: 100%;
  padding: 50px 0;
  border-radius: 20px;
  @media screen and (max-width: 577px) {
    height: 100%;
  }
  img {
    width: 80px;
    margin-bottom: 20px;
  }

  p {
    font-weight: 200;
    font-size: 24px;
    margin-bottom: 15px;
  }

  .error {
    font-size: 12px;
    color: #f5f5f5;
    background-color: rgba(30, 39, 107, 1);
    border-radius: 20px;
    padding: 5px;
    opacity: 0.7;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    width: 100%;

    input {
      min-width: 200px;
      margin-bottom: 20px;
      line-height: 25px;
      padding: 8px;
      font-size: 17px;
      border: none;
      border-bottom: 1px solid lightgray;
      color: #ffffff;
      &::placeholder {
        color: #b9b3b3;
      }
      outline: none;
      background-color: transparent;
      @media screen and (max-width: 577px) {
        width: 80%;
      }
    }

    button {
      cursor: pointer;
      line-height: 25px;
      width: 40%;
      padding: 10px;
      margin-top: 5px;
      border: none;
      background-color: rgba(30, 39, 107, 1);
      color: white;
      border-radius: 5px;
      text-transform: uppercase;
    }
  }

  span {
    font-size: 12px;

    a {
      color: rgba(30, 39, 107, 1);
    }
  }
`;
