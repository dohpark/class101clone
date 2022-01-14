import styled, { keyframes } from "styled-components";
import palette from "../../../styles/palette";
import Button from "../Button";

const BarContainer = styled.div`
  height: 25px;
  background-color: ${palette.gray100};
  position: relative;
  border-radius: 3px;
`;

const progressAnimation = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const BarAnimation = styled.div`
  position: absolute;
  height: 100%;
  background-color: rgb(125, 44, 255);
  animation: ${progressAnimation} 5s forwards;
  animation-iteration-count: infinite;
`;

const ProgressBar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <BarContainer className={className}>
      <BarAnimation />
    </BarContainer>
  );
};

export default ProgressBar;
