import React, { Children } from "react";
import styled from "styled-components";
import useCarousel from "../../molecules/Carousel";

// function component type
interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  slidesPerView: number;
  mobileSlidesPerView: number;
  paginationType?: "circle" | "number";
  autoplay?: boolean;
  children: React.ReactNode;
}

// styled components
const CarouselOuterContainer = styled.div`
  margin: auto;
  width: 100%;
  position: relative;

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    bottom: 15px;
    z-index: 333;

    @media screen and (max-width: 1240px) {
      bottom: 20px;
    }
  }
`;

const ButtonContainer = styled.span`
  position: absolute;
  bottom: 5%;
  left: 85%;
  z-index: 333;

  .leftButton {
    margin: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    @media screen and (max-width: 1024px) {
      display: none;
    }
  }
  .rightButton {
    margin: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    @media screen and (max-width: 1024px) {
      display: none;
    }
  }
`;

const CarouselBottomBanner: React.FC<CarouselProps> = ({
  slidesPerView,
  mobileSlidesPerView,
  children,
}) => {
  const slidesCount = Children.count(children);
  const { LeftButton, RightButton, PaginationProp, CarouselContainer } =
    useCarousel(slidesCount, slidesPerView, mobileSlidesPerView, false);

  return (
    <CarouselOuterContainer>
      {CarouselContainer({ children })}
      <ButtonContainer>
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
      </ButtonContainer>
      <PaginationProp paginationType="circle" className="circle" />
    </CarouselOuterContainer>
  );
};
export default CarouselBottomBanner;
