import React, { useContext } from "react";
import styled from "styled-components";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useState } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
//import { updateProfile } from "firebase/auth";

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(0);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoading(Math.floor(progress));
          // switch (snapshot.state) {
          //   case "paused":
          //     console.log("Upload is paused");
          //     break;
          //   case "running":
          //     console.log("Upload is running");
          //     break;
          // }
        },
        error => {
          //setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      // Atomically add a new region to the "regions" array field.
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
    setTimeout(() => {
      setLoading(0);
    }, 1000);
  };

  return (
    <InputContainer loading={loading}>
      <div className="loader"></div>
      <div className="loaderCover"></div>
      <div className="input-icons">
        <input
          type="file"
          id="sendImg"
          style={{ display: "none" }}
          onChange={e => setImage(e.target.files[0])}
        />
        <label htmlFor="sendImg" className={image && "loaded"}>
          <AddPhotoAlternateIcon />
        </label>
      </div>
      <input
        type="text"
        placeholder="Message"
        onChange={e => setText(e.target.value)}
        value={text}
        className="msgtxt"
      />
      <IconButton onClick={() => handleSend()}>
        <SendIcon />
      </IconButton>
    </InputContainer>
  );
};

export default Input;

const InputContainer = styled.div`
  height: 50px;
  padding: 10px;
  min-width: 265px;
  background-color: #fff;
  display: flex;
  align-items: center;
  z-index: 100;
  position: relative;

  .loader {
    transition: all 400ms ease-in-out;
    position: absolute;
    height: 4px;
    background-color: #07e707;
    width: ${props => props.loading + "%"};
    left: 0;
    right: 0;
    top: 0;
  }
  .loaderCover {
    position: absolute;
    height: 4px;
    background-color: ${props => (props.loading ? "#07e707" : "#fff")};
    width: 0;
    left: 0;
    right: 0;
    top: 0;
  }

  .input-icons {
    color: #7e7e7e;
  }

  input {
    border: none;
    outline: none;
    margin: 0px 10px;
    background-color: lightgray;
    border-radius: 20px;
    padding: 5px 15px;
  }

  .msgtxt {
    width: 100%;
  }
  .MuiSvgIcon-root {
    cursor: pointer;
    font-size: 24px;
    padding-top: 5px;
  }

  button {
    border: none;
    outline: none;
    background-color: transparent;
  }

  .loaded {
    color: #0075e2;
  }
`;
