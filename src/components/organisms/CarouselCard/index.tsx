import React, { Children } from "react";
import styled from "styled-components";
import useCarousel from "../../molecules/Carousel";

// function component type
interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  slidesPerView: number;
  mobileSlidesPerView: number;
  children: React.ReactNode;
}

// styled components
const CarouselOuterContainer = styled.div`
  margin: auto;
  width: 100%;
  position: relative;

  @media screen and (max-width: 1024px) {
    margin-left: -24px;
    margin-right: -24px;
    width: calc(100% + 48px);
    overflow: hidden;
  }

  .leftButton {
    position: absolute;
    z-index: 1;
    top: 40%;
    left: -5%;
    border: 0;

    &:disabled {
      background-color: transparent;
    }
    &:hover {
      background-color: transparent;
    }

    @media screen and (max-width: 1240px) {
      display: none;
    }
  }

  .rightButton {
    position: absolute;
    z-index: 1;
    right: -5%;
    top: 40%;
    border: 0;

    &:disabled {
      background-color: transparent;
    }
    &:hover {
      background-color: transparent;
    }

    @media screen and (max-width: 1240px) {
      display: none;
    }
  }

  .innerContainer {
    @media screen and (max-width: 1024px) {
      overflow: visible;
      width: calc(100% - 48px);
    }
  }
`;

const CarouselCard: React.FC<CarouselProps> = ({
  slidesPerView,
  mobileSlidesPerView,
  children,
}) => {
  const slidesCount = Children.count(children);
  const { LeftButton, RightButton, CarouselContainer } = useCarousel(
    slidesCount,
    slidesPerView,
    mobileSlidesPerView,
    false
  );

  return (
    <CarouselOuterContainer>
      <LeftButton
        buttonIconColor="black"
        buttonBackgroundColor="white"
        className="leftButton"
      />
      <RightButton
        buttonIconColor="black"
        buttonBackgroundColor="white"
        className="rightButton"
      />

      {CarouselContainer({ className: "innerContainer", children })}
    </CarouselOuterContainer>
  );
};
export default CarouselCard;
