import React from "react";
import styled, { css } from "styled-components";
import palette from "../../../styles/palette";

interface StyledBadgeProps {
  size: "xs" | "sm" | "md";
  color?: string;
  backgroundColor?: string;
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  size: "xs" | "sm" | "md";
  color?: string;
  backgroundColor?: string;
  children: React.ReactNode;
}

const getBadgeSize = (size: string) => {
  switch (size) {
    case "xs":
      return css`
        font-size: 9px;
        min-width: 16px;
        padding: 4;
      `;
    case "sm":
      return css`
        font-size: 9px;
        min-width: 20px;
        padding: 6;
      `;
    case "md":
      return css`
        font-size: 11px;
        min-width: 24px;
        padding: 6;
      `;
  }
};

const TagBox = styled.div<StyledBadgeProps>`
  font-weight: 600;
  background-color: ${(props) => props.backgroundColor || palette.black};
  color: ${(props) => props.color || palette.white};
  ${(props) => getBadgeSize(props.size)};
`;

const Badge: React.FC<BadgeProps> = ({
  children,
  size,
  backgroundColor,
  color,
  className,
}) => {
  return (
    <TagBox
      size={size}
      backgroundColor={backgroundColor}
      color={color}
      className={className}
    >
      {children}
    </TagBox>
  );
};

export default Badge;
