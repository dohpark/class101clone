import styled from "styled-components";
import palette from "../../../styles/palette";
import IconButton from "../../atoms/IconButton";

const SearchBarForm = styled.form`
  width: 100%;
  position: relative;

  .searchIcon {
    position: absolute;
    right: 2%;
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
`;

interface SearchBarProps {
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  return (
    <SearchBarForm action="#">
      <SearchBarInput type="search" placeholder={placeholder}></SearchBarInput>
      <IconButton iconName="Search" fillColor="black" className="searchIcon" />
    </SearchBarForm>
  );
};

export default SearchBar;
