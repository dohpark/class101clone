import styled from "styled-components";
import palette from "../../../styles/palette";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import { Link } from "react-router-dom";

const BottomNavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: ${palette.white};
  border-top: 0.5px solid ${palette.gray200};
`;

const BottomNavWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 1024px) {
    display: none;
  }

  .bottomNavButton {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
  }

  .bottomNavIconName {
    font-size: 9px;
    font-weight: 600;
  }

  .iconNameClass {
    color: ${palette.orange600};
  }
`;

const HelpButton = styled.button`
  position: absolute;
  bottom: 30px;
  right: 30px;
  background-color: ${palette.orange300};
  border: 0;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  border: 0.1px solid ${palette.orange200};
`;

const BottomNav = () => {
  return (
    <BottomNavContainer>
      <BottomNavWrapper>
        <Button className="bottomNavButton">
          <span className="bottomNavIcon">
            <Icon iconName="Class" size={22} fillColor={palette.orange600} />
          </span>
          <span className="bottomNavIconName iconNameClass">클래스</span>
        </Button>
        <Button className="bottomNavButton">
          <span className="bottomNavIcon">
            <Icon iconName="Store" size={22} />
          </span>
          <span className="bottomNavIconName">스토어</span>
        </Button>
        <Button className="bottomNavButton">
          <span className="bottomNavIcon">
            <Icon iconName="Menu" size={22} />
          </span>
          <span className="bottomNavIconName">카테고리</span>
        </Button>
        <Button className="bottomNavButton">
          <span className="bottomNavIcon">
            <Icon iconName="Account" size={22} />
          </span>
          <span className="bottomNavIconName">마이페이지</span>
        </Button>
      </BottomNavWrapper>
      <HelpButton>
        <Icon iconName="Help" size={30} fillColor="white" />
      </HelpButton>
    </BottomNavContainer>
  );
};

export default BottomNav;
