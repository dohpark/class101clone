import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import IconButton from "../../atoms/IconButton";
import SearchBarModal from "../../organisms/SearchBarModal";
import useModal from "../../../hooks/useModal";

// type
interface SearchBarProps {
  placeholder: string;
  modal: boolean;
}

// styled-components
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

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, modal }) => {
  const { openModal, closeModal, ModalPortal } = useModal();

  return (
    <SearchBarForm action="#">
      <SearchBarInput
        type="search"
        placeholder={placeholder}
        onClick={() => openModal()}
      />
      <IconButton iconName="Search" fillColor="black" className="searchIcon" />

      {modal && (
        <ModalPortal>
          <SearchBarModal closeModal={closeModal} />
        </ModalPortal>
      )}
    </SearchBarForm>
  );
};

export default SearchBar;
