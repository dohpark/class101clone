import styled, { css } from "styled-components";
import palette from "../../../styles/palette";

const getButtonBackgroundColor = (color: string) => {
  switch (color) {
    case "orange":
      return css`
        background-color: ${palette.orange500};
      `;
    case "orangeLight":
      return css`
        background-color: ${palette.orange100};
      `;
    default:
      return css`
        background-color: ${palette.white};
      `;
  }
};

const getButtonColor = (color: string) => {
  switch (color) {
    case "orange":
      return css`
        color: ${palette.orange500};
      `;
    case "orangeLight":
      return css`
        color: ${palette.orange100};
      `;
    default:
      return css`
        color: ${palette.black};
      `;
  }
};

const getButtonSize = (size: "md") => {
  switch (size) {
    case "md":
      return css`
        font-size: 18px;
        font-weight: 500;
      `;
  }
};

interface StyledButtonProps {
  color: "default" | "orange" | "orangeLight";
  size: "md";
  backgroundColor: "default" | "orange" | "orangeLight";
}

const ButtonBox = styled.button<StyledButtonProps>`
  width: 100%;
  border: 0;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  ${(props) => getButtonColor(props.color)};
  ${(props) => getButtonSize(props.size)};
  ${(props) => getButtonBackgroundColor(props.backgroundColor)}
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  backgroundColor?: "default" | "orange" | "orangeLight";
  color?: "default" | "orange" | "orangeLight";
  size?: "md";
}

const Button: React.FC<ButtonProps> = ({
  children,
  backgroundColor = "default",
  color = "default",
  size = "md",
  className,
  onClick,
  disabled,
}) => {
  return (
    <ButtonBox
      backgroundColor={backgroundColor}
      color={color}
      size={size}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonBox>
  );
};

export default Button;
