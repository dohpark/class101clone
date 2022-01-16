import React, { useState } from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import IconButton from "../../atoms/IconButton";
import SearchBarModal from "../../organisms/SearchBarModal";

const SearchBarForm = styled.form`
  width: 100%;
  position: relative;

  .searchIcon {
    position: absolute;
    right: 2%;

    @media screen and (max-width: 1024px) {
      top: -5px;
    }
  }
`;

const SearchBarInput = styled.input`
  font-size: 14px;
  background-color: ${palette.gray100};
  width: 100%;
  border: 1px solid ${palette.gray100};
  border-radius: 24px;
  text-align: left;
  color: ${palette.gray900};
  padding: 12px 52px 12px 16px;
  outline: none;

  @media screen and (max-width: 1024px) {
    padding: 6px 12px;
  }
`;

interface SearchBarProps {
  placeholder: string;
  modal: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, modal }) => {
  const [isOpen, setIsOpen] = useState(false);

  let windowOffset: number;
  const openModal = () => {
    setIsOpen(true);
    windowOffset = window.scrollY;
    document.body.setAttribute(
      "style",
      `position: fixed; top: ${windowOffset}px; left: 0; right: 0;`
    );
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.setAttribute("style", "margin: 0");
    window.scrollTo(0, windowOffset);
  };

  return (
    <SearchBarForm action="#">
      <SearchBarInput
        type="search"
        placeholder={placeholder}
        onClick={openModal}
      ></SearchBarInput>
      <IconButton iconName="Search" fillColor="black" className="searchIcon" />
      {modal && <SearchBarModal isOpen={isOpen} closeModal={closeModal} />}
    </SearchBarForm>
  );
};

export default SearchBar;
