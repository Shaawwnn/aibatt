import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(0);

  const handleAvatar = e => {
    setAvatar(prev => (e.target.value ? !prev : prev));
  };

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setLoading(progress);
        },
        error => {
          setErr(true);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/login");
          });
        }
      );
    } catch (error) {
      setErr(true);
    }

    setLoading(0);
  };

  return (
    <RegisterContainer>
      <Helmet>
        <title>Aibatt | Register</title>
      </Helmet>
      <FormOuter>
        <FormInner>
          <img src="images/bat.png" alt="" />
          <p>Register</p>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Display Name" required />
            <input type="text" placeholder="Enter Username" required />
            <input type="password" placeholder="Enter Password" required />
            <input
              type="file"
              style={{ display: "none" }}
              id="avatar"
              onChange={handleAvatar}
              required
            />
            <label htmlFor="avatar">
              {avatar ? (
                <DoneAllIcon className="done" />
              ) : (
                <AddPhotoAlternateIcon />
              )}
              {avatar ? "Success" : "Add Avatar"}
            </label>
            <button>Register</button>
          </form>

          {loading ? (
            <div className="load-3">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          ) : undefined}

          {err && <p className="error">*Something went wrong*</p>}
          <span>
            Already have an account? <Link to="/login">Sign In</Link>
          </span>
        </FormInner>
      </FormOuter>
    </RegisterContainer>
  );
};

export default Register;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  overflow: hidden;
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
  height: 100%;
  max-height: 800px;
  justify-content: space-between;
  width: 100%;
  padding: 50px 0;
  border-radius: 20px;
  @media screen and (max-width: 577px) {
    height: 100%;
  }
  img {
    width: 50px;
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
    background-color: #db0000;
    border-radius: 20px;
    padding: 5px;
    opacity: 0.7;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    padding: 20px;

    input {
      margin-bottom: 20px;
      line-height: 20px;
      padding: 8px;
      font-size: 16px;
      border: none;
      border-bottom: 1px solid lightgray;
      color: #ffffff;
      &::placeholder {
        color: #b9b3b3;
      }
      outline: none;
      background-color: transparent;
    }

    .MuiSvgIcon-root {
      margin-right: 10px;
      cursor: pointer;
    }

    button {
      cursor: pointer;
      line-height: 25px;
      width: 40%;
      padding: 10px;
      margin-top: 15px;
      border: none;
      background-color: rgba(30, 39, 107, 1);
      color: white;
      border-radius: 5px;
      text-transform: uppercase;
    }

    label {
      align-self: flex-start;
      color: #b9b3b3;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 5px;
    }

    .done {
      color: green;
    }
  }
  span {
    font-size: 12px;
    margin-top: 20px;
    a {
      color: rgba(30, 39, 107, 1);
    }
  }
`;
