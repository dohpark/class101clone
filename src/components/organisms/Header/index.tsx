import styled from "styled-components";
import Button from "../../atoms/Button";
import palette from "../../../styles/palette";
import SearchBar from "../../molecules/SearchBar";

const HeaderContainer = styled.header`
  max-width: 1176px;
  width: 100%;
  padding: 20px 0;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoWrapper = styled.div`
  width: 12.5%;
  font-size: 1.5rem;
  font-weight: 800;
`;

const ClassStoreWrapper = styled.div`
  display: flex;
  width: 12.5%;
  margin-right: 36px;

  .class {
    justify-content: start;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${palette.orange700};
  }

  .store {
    justify-content: start;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${palette.black};
  }
`;

const SearchWrapper = styled.div`
  width: 35%;
`;

const ButtonWrapper = styled.div`
  width: 40%;
  display: flex;

  .space {
    width: 41%;
    height: 1px;
  }
  .buttons {
    display: flex;
    flex-grow: 1;
  }

  .creatorsupport,
  .corpedu,
  .login {
    font-weight: 400;
    justify-content: end;
    font-size: 14px;
    margin: 0;
    border: 0;
    padding: 0;
    color: ${palette.gray800};
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoWrapper>CLASS102</LogoWrapper>
      <ClassStoreWrapper>
        <Button className="class">클래스</Button>
        <Button className="store">스토어</Button>
      </ClassStoreWrapper>
      <SearchWrapper>
        <SearchBar placeholder={"찾으시는 취미가 있으신가요?"} modal={true} />
      </SearchWrapper>
      <ButtonWrapper>
        <div className="space"></div>
        <div className="buttons">
          <Button className="creatorsupport">크리에이터 지원</Button>
          <Button className="corpedu">기업교육</Button>
          <Button className="login">로그인</Button>
        </div>
      </ButtonWrapper>
    </HeaderContainer>
  );
};

export default Header;
