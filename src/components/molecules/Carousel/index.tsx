import React, { Children, useEffect } from "react";
import { useState, useRef } from "react";
import styled, { css } from "styled-components";
import IconButton from "../../atoms/IconButton";

interface StyledSlideProps {
  slidesView: number;
  count: number;
}

interface StyledButtonProps {
  navPosition: "rightIn" | "eachSide";
}

const SlidesViewWidth = (slidesView: number, count: number) => {
  if (count < slidesView) {
    return css`
      width: calc((100% - 20px * ${slidesView - 1}) / ${slidesView});
    `;
  } else {
    return css`
      min-width: calc((100% - 20px * ${slidesView - 1}) / ${slidesView});
    `;
  }
};

const getNavPosition = (navPosition: "rightIn" | "eachSide") => {
  switch (navPosition) {
    case "rightIn":
      return css`
        position: absolute;
        bottom: 5%;
        left: 85%;
        width: 100%;
        z-index: 1;
      `;
    case "eachSide":
      return css`
        position: relative;
        .leftButton {
          position: absolute;
          z-index: 1;
          top: 40%;
        }

        .rightButton {
          position: absolute;
          z-index: 1;
          right: 0%;
          top: 40%;
        }
      `;
  }
};

const EachSideContainer = styled.div<StyledButtonProps>`
  margin: auto;
  width: 100%;
  ${(props) =>
    props.navPosition === "eachSide" && getNavPosition(props.navPosition)};
`;

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: auto;
  display: flex;
  align-items: center;
`;

const SlideProps = styled.section<StyledSlideProps>`
  width: 100%;
  display: flex;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
  position: relative;

  > div {
    ${(props) => SlidesViewWidth(props.slidesView, props.count)};
    margin: 0 20px 0 0;
    border-radius: 20px;
    position: relative;
    left: 0;
    transition: 0.5s;
  }
`;

const ButtonProps = styled.div<StyledButtonProps>`
  ${(props) => getNavPosition(props.navPosition)};
`;

const PaginationProps = styled.div``;

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  slidesView: number;
  navPosition: "rightIn" | "eachSide";
  pagination?: boolean;
  autoplay?: boolean;
  maxWidth?: boolean;
  children: React.ReactNode;
  iconColor?: "black" | "white";
}

const Carousel: React.FC<CarouselProps> = ({
  slidesView,
  navPosition,
  pagination,
  autoplay,
  maxWidth,
  iconColor = "black",
  children,
}) => {
  const [active, setActive] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const count = Children.count(children);

  const onClickLeft = (event: React.MouseEvent<HTMLElement>) => {
    if (active === 0) return;
    setActive(active - 1);
  };
  const onClickRight = (event: React.MouseEvent<HTMLElement>) => {
    if (count < slidesView) return;
    if (active === count - slidesView) return;
    setActive(active + 1);
  };

  useEffect(() => {
    const { current } = slideRef;
    if (current != null) {
      console.log(current.offsetWidth);
      const width = ((current.offsetWidth + 20) / slidesView) * active;
      current.style.transform = `translateX(calc(-${width}px))`;
    }
  }, [active, slidesView]);

  return (
    <EachSideContainer navPosition={navPosition}>
      {navPosition === "eachSide" && (
        <IconButton
          className="leftButton"
          iconName="ChevronLeft"
          fillColor={iconColor}
          onClick={onClickLeft}
        />
      )}
      {navPosition === "eachSide" && (
        <IconButton
          className="rightButton"
          iconName="ChevronRight"
          fillColor={iconColor}
          onClick={onClickRight}
        />
      )}
      <CarouselContainer>
        <SlideProps slidesView={slidesView} count={count} ref={slideRef}>
          {children}
        </SlideProps>
        {navPosition !== "eachSide" && (
          <ButtonProps navPosition={navPosition}>
            <IconButton
              iconName="ChevronLeft"
              fillColor={iconColor}
              onClick={onClickLeft}
            />
            <IconButton
              iconName="ChevronRight"
              fillColor={iconColor}
              onClick={onClickRight}
            />
          </ButtonProps>
        )}
        {pagination && <PaginationProps></PaginationProps>}
      </CarouselContainer>
    </EachSideContainer>
  );
};

export default Carousel;
