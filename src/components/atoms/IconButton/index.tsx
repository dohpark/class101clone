import styled, { css } from "styled-components";
import palette from "../../../styles/palette";
import Icon from "../Icon";

type iconName =
  | "ChevronLeft"
  | "ChevronRight"
  | "Close"
  | "Heart"
  | "HeartOutline"
  | "Like"
  | "LikeOutline";

const getButtonBackgroundColor = (color: string) => {
  switch (color) {
    case "white":
      return css`
        background-color: ${palette.white};
      `;
    case "black":
      return css`
        background-color: ${palette.black};
      `;
    case "transparent":
      return css`
        background-color: transparent;
      `;
    default:
      return css`
        background-color: transparent;
      `;
  }
};

const getButtonSize = (size: "sm") => {
  switch (size) {
    case "sm":
      return css`
        height: 32px;
        width: 32px;
        margin: 4px;
      `;
  }
};

interface StyledIconButtonProps {
  size: "sm";
  backgroundColor: "white" | "transparent" | "black";
}

const IconButtonBox = styled.button<StyledIconButtonProps>`
  padding: 0;
  border: 0;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  ${(props) => getButtonSize(props.size)};
  ${(props) => getButtonBackgroundColor(props.backgroundColor)}

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: "white" | "transparent" | "black";
  size?: "sm";
  iconName: iconName;
  fillColor: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  backgroundColor = "transparent",
  size = "sm",
  iconName,
  fillColor,
  onClick,
  className,
}) => {
  return (
    <IconButtonBox
      backgroundColor={backgroundColor}
      size={size}
      onClick={onClick}
      className={className}
    >
      <Icon size={18} iconName={iconName} fillColor={fillColor} />
    </IconButtonBox>
  );
};

export default IconButton;
