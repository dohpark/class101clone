import styled from "styled-components";
import Button from "../../atoms/Button";
import palette from "../../../styles/palette";
import SearchBar from "../../molecules/SearchBar";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { useEffect } from "react";

// styled-components
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: left;

  a {
    text-decoration: none;
    &:visited {
      color: ${palette.black};
    }
    &:link {
      color: ${palette.black};
    }
  }

  @media screen and (max-width: 1024px) {
    padding: 18px 24px 8px;
  }

  @media screen and (min-width: 1024px) and (max-width: 1240px) {
    padding: 20px 0;
    margin-left: 32px;
    margin-right: 32px;
  }

  @media screen and (min-width: 1240px) {
    padding: 20px 0;
    max-width: 1176px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const LogoWrapper = styled.h1`
  margin-right: 28px;
  font-size: 1.5rem;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 0;

  @media screen and (max-width: 1024px) {
    font-size: 18px;
  }
`;

const ClassStoreWrapper = styled.div`
  display: flex;
  margin-right: 36px;

  .class {
    justify-content: start;
    margin: 0 20px 0 0;
    padding: 0;
    border: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${palette.orange700};
    min-width: 52px;
  }

  .store {
    justify-content: start;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${palette.black};
    min-width: 52px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const SearchWrapper = styled.div`
  @media screen and (min-width: 1024px) {
    width: 420px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-left: auto;

  .buttons {
    display: flex;
  }

  .creatorsupport {
    font-weight: 400;
    justify-content: end;
    font-size: 14px;
    margin: 0;
    border: 0;
    padding: 0;
    color: ${palette.gray800};
    margin-right: 24px;
    min-width: 90px;
  }
  .corpedu {
    font-weight: 400;
    justify-content: end;
    font-size: 14px;
    margin: 0;
    border: 0;
    padding: 0;
    color: ${palette.gray800};
    margin-right: 24px;
    min-width: 50px;
  }
  .login {
    font-weight: 400;
    justify-content: end;
    font-size: 14px;
    margin: 0;
    border: 0;
    padding: 0;
    color: ${palette.gray800};
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Header = () => {
  const { innerWidth } = useWindowDimensions();
  let placeholderText: string;
  if (innerWidth <= 1240) placeholderText = "????????? ??????";
  else placeholderText = "???????????? ????????? ????????????????";

  useEffect(() => {
    if (innerWidth <= 1240) placeholderText = "????????? ??????";
    else placeholderText = "???????????? ????????? ????????????????";
  }, []);

  return (
    <HeaderContainer>
      <a target="card" href="https://github.com/dohpark/class101clone">
        <LogoWrapper>CLASS102</LogoWrapper>
      </a>
      <ClassStoreWrapper>
        <Button className="class">?????????</Button>
        <Button className="store">?????????</Button>
      </ClassStoreWrapper>
      <SearchWrapper>
        <SearchBar placeholder={placeholderText} modal={true} />
      </SearchWrapper>
      <ButtonWrapper>
        <div className="buttons">
          <Button className="creatorsupport">??????????????? ??????</Button>
          <Button className="corpedu">????????????</Button>
          <Button className="login">?????????</Button>
        </div>
      </ButtonWrapper>
    </HeaderContainer>
  );
};

export default Header;
