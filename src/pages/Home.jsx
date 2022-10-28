import React from "react";
import styled from "styled-components";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <HomeContainer>
      <Helmet>
        <title>Aibatt</title>
      </Helmet>
      <ChatContainer>
        <SideBar />
        <Chat />
      </ChatContainer>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  background-color: #e3f8ff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatContainer = styled.div`
  width: 65%;
  height: 90%;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  display: flex;

  @media screen and (max-width: 1240px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;
