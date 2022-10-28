import React, { useContext } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({
      block: "end",
      inline: "nearest",
    });
  }, [message]);

  return (
    <MessageContainer
      className={message.senderId === currentUser.uid ? "owner" : undefined}
    >
      <MessageInfo>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className={
            message.senderId === currentUser.uid ? "ownerImg" : undefined
          }
        />
      </MessageInfo>
      <MessageContent
        className={message.senderId === currentUser.uid ? "owner" : undefined}
      >
        <p>{message.text}</p>
        {message.image && <img src={message.image} alt="" />}
        <span>{new Date(message.date.seconds * 1000).toLocaleString()}</span>
      </MessageContent>
      <div ref={ref}></div>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  &.owner {
    flex-direction: row-reverse;
    margin-right: 20px;
  }
`;

const MessageInfo = styled.div`
  padding-top: 5px;
  img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin: 0 15px;
    object-fit: cover;

    @media screen and (max-width: 577px) {
      margin: 0 5px;
    }
    &.ownerImg {
      display: none;
    }
  }
`;

const MessageContent = styled.div`
  background-color: #ddddf7;
  border-radius: 10px 10px 10px 10px;
  padding: 10px;
  padding-bottom: 20px;
  max-width: 60%;
  min-width: 52%;
  position: relative;
  color: #000000;
  &.owner {
    background-color: #5d5b8d;
    color: white;
    max-width: 70%;
  }
  img {
    width: 100%;
    margin: 10px 0;
  }

  p {
    line-height: 16px;
    font-size: 14px;
    @media screen and (max-width: 577px) {
      line-height: 14px;
      font-size: 12px;
    }
  }

  span {
    position: absolute;
    font-size: 7px;
    letter-spacing: 1px;
    bottom: 0;
    font-weight: 500;
    font-style: italic;
    right: 10px;
    @media screen and (max-width: 577px) {
      font-size: 8px;
    }
  }
`;
