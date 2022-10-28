import React, { useState, useEffect } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messages = ({ avatar, name }) => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), doc => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <MessagesContainer>
      <div className="profile">
        <div className="profile-inner">
          <img src={avatar} alt="" className="avatar" />
        </div>
        <h2>{name}</h2>
      </div>
      {messages.map(x => {
        return <Message message={x} key={x.id} />;
      })}
    </MessagesContainer>
  );
};

export default Messages;

const MessagesContainer = styled.div`
  height: calc(100% - 110px);
  background-color: #2a2849;
  padding: 0;
  padding-bottom: 0;
  overflow: auto;

  .profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 280px;

    .profile-inner {
      overflow: hidden;
      height: 140px;
      width: 140px;

      border-radius: 50%;
      .avatar {
        width: 100%;

        object-fit: cover;
      }
    }

    h2 {
      font-weight: 300;
      color: #ddddf7;
      padding: 10px;
      padding-bottom: 0;
      font-size: 20px;
    }
  }
`;
