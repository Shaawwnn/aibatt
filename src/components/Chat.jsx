import React, { useContext } from "react";
import styled from "styled-components";
import VideocamIcon from "@mui/icons-material/Videocam";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Input from "./Input";
import IconButton from "@mui/material/IconButton";
import Messages from "./Messages";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <ChatContainer>
      <div className="chat-nav">
        <div className="chat-info">
          <ArrowBackIcon />
          <h4>{data.user?.displayName}</h4>
        </div>
        <div className="chat-icons">
          <IconButton>
            <VideocamIcon />
          </IconButton>
          <IconButton>
            <PersonAddAlt1Icon />
          </IconButton>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </div>
      </div>

      <Messages avatar={data.user?.photoURL} name={data.user?.displayName} />
      <Input />
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  flex: 2;
  //flex-shrink: 1;
  min-width: 265px;

  .chat-nav {
    z-index: 200;
    display: flex;
    align-items: center;
    padding: 20px;
    height: 60px;
    justify-content: space-between;
    background-color: #5d5b8d;
    color: #ddddf7;

    h4 {
      font-weight: 400;
    }

    .chat-icons .MuiSvgIcon-root {
      cursor: pointer;
      color: #ddddf7;
    }

    .chat-info {
      display: flex;

      .MuiSvgIcon-root {
        display: none;
      }
    }
  }
`;
