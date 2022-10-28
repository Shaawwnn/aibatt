import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "./Search";
import SideBarNav from "./SideBarNav";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const SideBar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const closeSearch = () => {
    setSearching(false);
  };

  const openSearch = () => {
    setSearching(true);
  };

  return (
    <SideBarContainer
      className={width < 577 && searching ? "searching" : undefined}
    >
      <SideBarNav />

      <Search
        className="search--panel"
        width={width}
        closeSearch={() => closeSearch()}
        openSearch={() => openSearch()}
      />

      <div
        className="options"
        onClick={() => {
          signOut(auth);
        }}
      >
        <IconButton>
          <LogoutIcon className="innerOption" />
        </IconButton>
      </div>
    </SideBarContainer>
  );
};

export default SideBar;

const SideBarContainer = styled.div`
  flex: 1;
  background-color: #3e3e61;
  flex-shrink: 3;
  position: relative;
  transition: all 250ms ease-in;

  @media screen and (max-width: 577px) {
    max-width: 60px;
  }
  &.searching {
    @media screen and (max-width: 577px) {
      max-width: 200px;
    }
  }

  .options {
    position: absolute;
    left: 20px;
    bottom: 15px;
    height: 50px;
    width: 50px;
    background-color: #2f2d52;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    opacity: 0.95;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    @media screen and (max-width: 577px) {
      height: 40px;
      width: 40px;
      left: 10px;
      bottom: 10px;
      border: 1px solid white;
    }

    .innerOption {
      color: white;
    }

    &:hover {
      background-color: #1a193a;
    }
  }
`;
