import styled from "styled-components";
import palette from "../../../styles/palette";
import Icon from "../../atoms/Icon";
import TextButton from "../../atoms/TextButton";
import Category from "../../molecules/Category";

const NavContainer = styled.nav`
  display: flex;
  background-color: ${palette.white};
  border-bottom: 0.5px solid ${palette.gray200};

  @media screen and (max-width: 1024px) {
    padding-left: 24px;
    padding-right: 24px;
    position: sticky;
    top: 0;
    z-index: 3;
    overflow-x: scroll;
  }

  @media screen and (min-width: 1024px) and (max-width: 1240px) {
    margin-left: 32px;
    margin-right: 32px;
  }

  @media screen and (min-width: 1240px) {
    max-width: 1176px;
    margin-left: auto;
    margin-right: auto;
  }

  // buttons
  .tb {
    margin-right: 32px;
    padding: 8px 0px 20px;
    line-height: 24px;

    @media screen and (max-width: 1024px) {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      margin-right: 16px;
      padding: 12px 0;
      white-space: nowrap;
    }
  }

  .tb:hover {
    font-weight: 600;
    text-underline-offset: 10px;
    text-decoration-thickness: 2px;
    filter: brightness(100%);
  }

  .wall {
    padding: 8px 0px 20px;
    line-height: 24px;
    font-size: 33px;
    font-weight: 100;
    color: ${palette.gray200};

    @media screen and (max-width: 1024px) {
      display: none;
    }
  }

  .lb {
    margin-left: 28px;
    margin-right: 0;
    font-weight: 400;

    @media screen and (max-width: 1024px) {
      display: none;
    }
  }

  // category
  .categoryButton {
    position: relative;
    height: 100%;
    z-index: 2;

    @media screen and (max-width: 1024px) {
      display: none;
    }
  }

  .categoryButton:hover .category {
    visibility: visible;
    top: 53px;
  }
`;

const Nav: React.FC = () => {
  return (
    <NavContainer>
      <TextButton size="lg" color="black" className="tb categoryButton">
        전체 카테고리 &nbsp;
        <Icon fillColor={palette.black} iconName="Menu" size={12} />
        <Category className="category" />
      </TextButton>
      <TextButton size="lg" color="black" className="tb">
        1월 가입혜택
      </TextButton>
      <TextButton size="lg" color="black" className="tb">
        이벤트
      </TextButton>
      <TextButton size="lg" color="black" className="tb">
        바로수강
      </TextButton>
      <TextButton size="lg" color="black" className="tb">
        신규 클래스
      </TextButton>
      <TextButton size="lg" color="black" className="tb">
        오픈 예정
      </TextButton>

      <div className="wall">|</div>

      <TextButton size="lg" color="black" className="tb lb">
        시그니처
      </TextButton>
      <TextButton size="lg" color="black" className="tb lb">
        키즈
      </TextButton>
      <TextButton size="lg" color="black" className="tb lb">
        원포인트 클래스
      </TextButton>
    </NavContainer>
  );
};

export default Nav;
