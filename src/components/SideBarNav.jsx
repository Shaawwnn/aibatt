import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";

const SideBarNav = () => {
  const { currentUser } = useContext(AuthContext);
  const { photoURL } = currentUser;

  return (
    <SideBarNavContainer>
      <img src="/images/bat.png" alt="" />
      <div className="info">
        <img src={photoURL} alt="" />
      </div>
    </SideBarNavContainer>
  );
};

export default SideBarNav;

const SideBarNavContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  background-color: #2f2d52;
  display: flex;
  align-items: center;
  padding: 20px;
  height: 60px;
  justify-content: space-between;
  position: relative;
  img {
    width: 25px;

    @media screen and (max-width: 577px) {
      display: none;
    }
  }

  .info {
    color: #ddddf7;

    img {
      width: 32px;
      height: 32px;
      object-fit: cover;
      border-radius: 50%;
      cursor: pointer;
      display: block;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }

    &::after {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: #07e707;
      border-radius: 100%;
      border: 2px solid white;
      bottom: 14px;
      right: 14px;
    }
  }

  @media screen and (max-width: 577px) {
    padding: 15px 0 15px 15px;
  }
`;
