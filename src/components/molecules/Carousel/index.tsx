import React, { Children, useEffect } from "react";
import { useState, useRef } from "react";
import styled, { css } from "styled-components";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import IconButton from "../../atoms/IconButton";
import Pagination from "../Pagination";

interface StyledSlideProps {
  slidesView: number;
  count: number;
  type: "banner" | "popular" | "default";
}

interface StyledButtonProps {
  navPosition: "rightIn" | "eachSide";
}

const getWidthPercentage = (type: "popular" | "banner" | "default") => {
  switch (type) {
    case "banner":
      return css`
        width: 100%;
      `;
    default:
      return css`
        width: 100%;
      `;
  }
};

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
    case "eachSide":
      return css`
        position: relative;

        .leftButton {
          position: absolute;
          z-index: 1;
          top: 40%;
          left: -5%;

          &:disabled {
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

          &:disabled {
            background-color: transparent;
          }

          @media screen and (max-width: 1240px) {
            display: none;
          }
        }
      `;
  }
};

const EachSideContainer = styled.div<StyledButtonProps>`
  margin: auto;
  width: 100%;
  ${(props) =>
    props.navPosition === "eachSide" && getNavPosition(props.navPosition)};

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

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: auto;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1240px) {
    overflow-x: scroll;
  }
`;

const SlideProps = styled.section<StyledSlideProps>`
  width: 100%;
  display: flex;
  transition: transform 0.5s ease-in-out;
  position: relative;
  z-index: 0;

  @media screen and (max-width: 1024px) {
    ${(props) => getWidthPercentage(props.type)};
  }

  > div {
    ${(props) => SlidesViewWidth(props.slidesView, props.count)};
    margin: 0 20px 0 0;
    position: relative;
    left: 0;
    transition: 0.5s;
  }
`;

const ButtonProps = styled.div<StyledButtonProps>`
  ${(props) => getNavPosition(props.navPosition)};
`;

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "banner" | "popular" | "default";
  slidesView: number;
  navPosition: "rightIn" | "eachSide";
  paginationType?: "circle" | "number";
  autoplay?: boolean;
  children: React.ReactNode;
  iconBackgroundColor?: "black" | "white" | "transparent";
  iconColor?: "black" | "white";
}

const Carousel: React.FC<CarouselProps> = ({
  type = "default",
  slidesView,
  navPosition,
  paginationType,
  autoplay = false,
  iconBackgroundColor = "transparent",
  iconColor = "black",
  children,
}) => {
  const count = Children.count(children);
  let paginationActive: boolean;

  if (paginationType === "circle") paginationActive = true;
  else paginationActive = false;

  // slidesPerViewResponsive
  const { innerWidth } = useWindowDimensions();
  if (innerWidth <= 1024 && type !== "banner") slidesView = 2;
  if (innerWidth <= 1024 && type === "popular") slidesView = 1;
  // banner

  // button disabled
  const leftButtonDisabled = () => {
    if (autoplay) return false;
    if (active === 0) return true;
  };
  const rightButtonDisabled = () => {
    if (autoplay) return false;
    if (active === count - slidesView) return true;
  };

  // click event
  const onClickLeft = (event: React.MouseEvent<HTMLElement>) => {
    if (autoplay) {
      setActive(active - 1);
      if (active <= 0) {
        setActive(count - slidesView);
      }
    } else {
      if (active === 0) return;
      setActive(active - 1);
    }
  };
  const onClickRight = (event: React.MouseEvent<HTMLElement>) => {
    if (autoplay) {
      setActive(active + 1);
      if (active > count - slidesView - 1) {
        setActive(0);
      }
    } else {
      if (count < slidesView) return;
      if (active === count - slidesView) return;
      setActive(active + 1);
    }
  };
  // pagination
  const onClickPaginationHandler = (index: number) => {
    setActive(index);
  };

  // swipe effect
  const [active, setActive] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = slideRef;
    if (current != null) {
      let margin = 20;
      const width = ((current.offsetWidth + margin) / slidesView) * active;
      current.style.transform = `translateX(calc(-${width}px))`;
    }
  }, [active, slidesView, innerWidth]);

  // autoplay
  useEffect(() => {
    const id = setInterval(() => {
      if (autoplay) {
        setActive(active + 1);
        if (active > count - slidesView - 1) {
          setActive(0);
        }
      }
    }, 5 * 1000);
    return () => clearInterval(id);
  }, [active, autoplay, count, slidesView]);

  // children clone
  // const childrenWithProps = Children.map(children, (child) => {
  //   if (isValidElement(child)) {
  //     return cloneElement(child, {
  //       slidesView,
  //       active,
  //       count,
  //       onClickPaginationHandler,
  //     });
  //   }
  //   return child;
  // });

  return (
    <EachSideContainer navPosition={navPosition}>
      {navPosition === "eachSide" && (
        <IconButton
          className="leftButton"
          iconName="ChevronLeft"
          fillColor={iconColor}
          backgroundColor={iconBackgroundColor}
          onClick={onClickLeft}
          disabled={leftButtonDisabled()}
        />
      )}
      {navPosition === "eachSide" && (
        <IconButton
          className="rightButton"
          iconName="ChevronRight"
          fillColor={iconColor}
          backgroundColor={iconBackgroundColor}
          onClick={onClickRight}
          disabled={rightButtonDisabled()}
        />
      )}
      <CarouselContainer>
        <SlideProps
          slidesView={slidesView}
          count={count}
          ref={slideRef}
          type={type}
        >
          {children}
        </SlideProps>
        {navPosition !== "eachSide" && (
          <ButtonProps navPosition={navPosition}>
            <IconButton
              className="leftButton"
              iconName="ChevronLeft"
              fillColor={iconColor}
              backgroundColor={iconBackgroundColor}
              onClick={onClickLeft}
              disabled={leftButtonDisabled()}
            />
            <IconButton
              className="rightButton"
              iconName="ChevronRight"
              fillColor={iconColor}
              backgroundColor={iconBackgroundColor}
              onClick={onClickRight}
              disabled={rightButtonDisabled()}
            />
          </ButtonProps>
        )}
      </CarouselContainer>
      {paginationActive && (
        <Pagination
          className="circle"
          paginationType={paginationType}
          slidesPerView={slidesView}
          active={active}
          childrenCount={count}
          onClickPaginationHandler={onClickPaginationHandler}
        />
      )}
    </EachSideContainer>
  );
};

export default Carousel;
