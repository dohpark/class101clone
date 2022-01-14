import React from "react";
import styled, { css } from "styled-components";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  expand: boolean;
}

interface StyledImageProps {
  expand: boolean;
}

const getExpandState = (expand: boolean) => {
  return expand
    ? css`
        transform: scale(1.1);
      `
    : css``;
};

const ImageBox = styled.img.attrs<ImageProps>((props) => ({
  src: props.src,
  alt: props.alt,
}))<StyledImageProps>`
  transition: all 0.3s;
  display: block;
  width: 100%;
  height: 100%;
  transform: scale(1);

  &:hover {
    ${(props) => getExpandState(props.expand)};
  }
`;

const Image: React.FC<ImageProps> = ({ src, alt, expand }) => {
  return <ImageBox src={src} alt={alt} expand={expand} />;
};

export default Image;
