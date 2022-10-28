import React from "react";
import styled from "styled-components";

const SearchResult = props => {
  return (
    <SearchResultContainer>
      <img src={props.img} alt="" />
      <div>
        <span>{props.name}</span>
      </div>
    </SearchResultContainer>
  );
};

export default SearchResult;

const SearchResultContainer = styled.div`
  cursor: pointer;
  height: 60px;
  padding: 10px;
  display: flex;
  color: #ddddf7;
  img {
    width: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }

  &:hover {
    background-color: #2f2d52;
  }

  div {
    display: flex;
    align-items: center;
  }
`;
