import React from "react";
import styled from "styled-components";

const Convo = props => {
  return (
    <ConvoContainer>
      <img src={props.img} alt="" />
      <div>
        <span>{props.name}</span>
        <p>{props.lastMsg}.</p>
      </div>
    </ConvoContainer>
  );
};

export default Convo;

const ConvoContainer = styled.div`
  cursor: pointer;
  height: 60px;
  padding: 10px;
  display: flex;
  color: #ddddf7;
  img {
    width: 40px;
    height: 40px;
    min-width: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
    background-color: #2f2d52;
  }

  &:hover {
    background-color: #2f2d52;
  }

  div {
    p {
      font-size: 11px;
    }

    @media screen and (max-width: 577px) {
      display: none;
    }
  }
`;
