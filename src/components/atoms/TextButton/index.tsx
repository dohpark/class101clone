import styled, { css } from "styled-components";
import palette from "../../../styles/palette";

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

interface StyledTextButtonProps {
  color: "default" | "orange" | "orangeLight" | "black";
  size: "md" | "lg";
}

const TextButtonBox = styled.button<StyledTextButtonProps>`
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

const TextButtonSpan = styled.span``;

interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "default" | "orange" | "orangeLight" | "black";
  size?: "md" | "lg";
}

const TextButton: React.FC<TextButtonProps> = ({
  children,
  color = "default",
  size = "md",
  className,
  onClick,
}) => {
  return (
    <TextButtonBox
      color={color}
      size={size}
      className={className}
      onClick={onClick}
    >
      <TextButtonSpan>{children}</TextButtonSpan>
    </TextButtonBox>
  );
};

export default TextButton;
