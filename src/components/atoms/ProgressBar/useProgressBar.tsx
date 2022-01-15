import { useState } from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";

const BarContainer = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.gray300};
  position: relative;
  border-radius: 3px;

  .animation {
    border-radius: 3px;
    position: absolute;
    height: 100%;
    background-color: ${palette.white};
    animation: progressAnimation 4700ms forwards;
  }

  @keyframes progressAnimation {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;

const useProgressBar = () => {
  const [toggle, setToggle] = useState("");

  const resetAnimation = () => {
    setToggle("");
    setTimeout(() => {
      setToggle("animation");
    }, 100);
  };

  const ProgressBar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
  }) => {
    return (
      <BarContainer className={className}>
        <div className={toggle} />
      </BarContainer>
    );
  };

  return { resetAnimation, ProgressBar };
};

export default useProgressBar;
