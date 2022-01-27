import styled, { css } from "styled-components";
import palette from "../../../styles/palette";

// type
type color = "default" | "orange" | "orangeLight" | "black";
type size = "md" | "lg";

interface StyledTextButtonProps {
  color: color;
  size: size;
}

interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: color;
  size?: size;
}

// function
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
    case "black":
      return css`
        color: ${palette.black};
      `;
    default:
      return css`
        color: ${palette.gray600};
      `;
  }
};

const getButtonSize = (size: "md" | "lg") => {
  switch (size) {
    case "md":
      return css`
        font-size: 14px;
        font-weight: 500;
      `;
    case "lg":
      return css`
        font-size: 16px;
        font-weight: 600;
      `;
  }
};

// styled-components
const TextButtonContainer = styled.button<StyledTextButtonProps>`
  border: 0px;
  outline: none;
  margin: 0px;
  padding: 0;
  background: none;
  cursor: pointer;
  letter-spacing: -0.2px;

  ${(props) => getButtonSize(props.size)}
  ${(props) => getButtonColor(props.color)}

  &:hover {
    text-decoration: underline;
    filter: brightness(85%);
  }
`;

const TextButton: React.FC<TextButtonProps> = ({
  children,
  color = "default",
  size = "md",
  className,
  onClick,
}) => {
  return (
    <TextButtonContainer
      color={color}
      size={size}
      className={className}
      onClick={onClick}
    >
      <span>{children}</span>
    </TextButtonContainer>
  );
};

export default TextButton;
