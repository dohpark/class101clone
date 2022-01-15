import styled from "styled-components";
import Button from "../../atoms/Button";
import palette from "../../../styles/palette";
import SearchBar from "../../molecules/SearchBar";

const HeaderContainer = styled.header`
  padding: 20px 0;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: left;

  @media screen and (min-width: 1024px) and (max-width: 1240px) {
    margin-left: 32px;
    margin-right: 32px;
  }

  @media screen and (min-width: 1240px) {
    max-width: 1176px;
  }
`;

const LogoWrapper = styled.div`
  margin-right: 28px;
  font-size: 1.5rem;
  font-weight: 800;
`;

const ClassStoreWrapper = styled.div`
  display: flex;
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
  @media screen and (min-width: 1024px) {
    width: 420px;
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
