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

interface StyledOuterContainer {
  navPosition: "rightIn" | "eachSide";
  type: "popular" | "banner" | "default";
}

interface StyledInnerContainer {
  type: "popular" | "banner" | "default";
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

const getOuterContainerResponsiveStyle = (
  type: "default" | "banner" | "popular"
) => {
  switch (type) {
    case "banner":
      return css``;
    default:
      return css`
        margin-left: -24px;
        margin-right: -24px;
        width: calc(100% + 48px);
        overflow: hidden;
      `;
  }
};

const getInnerContainerResponsiveStyle = (
  type: "default" | "banner" | "popular"
) => {
  switch (type) {
    case "banner":
      return css``;
    default:
      return css`
        overflow: visible;
        width: calc(100% - 48px);
      `;
  }
};

const EachSideContainer = styled.div<StyledOuterContainer>`
  margin: auto;
  width: 100%;
  ${(props) =>
    props.navPosition === "eachSide" && getNavPosition(props.navPosition)};

  @media screen and (max-width: 1024px) {
    ${(props) => getOuterContainerResponsiveStyle(props.type)}
  }

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

const CarouselContainer = styled.div<StyledInnerContainer>`
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: auto;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1024px) {
    ${(props) => getInnerContainerResponsiveStyle(props.type)}
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
      current.style.transform = `translateX(-${width}px)`;

      const transX = Number(current.style.transform.replace(/[^0-9.-]/g, ""));
      setTransLeftOffset(transX);
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

  // drag & scroll
  const [pressed, setPressed] = useState(false);
  const [startX, setStartX] = useState(0);
  const [transLeftOffset, setTransLeftOffset] = useState(0);
  const [walk, setWalk] = useState(0);
  const slide = slideRef.current;
  if (slide) slide.ondragstart = () => false;

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    setPressed(true);
    if (slide) {
      slide.style.cursor = "grabbing";
      slide.style.transition = "transform 0s cubic-bezier(1,-0.01, 1, 1)";
      setStartX(event.pageX);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (pressed && slide && startX) {
      const x = event.pageX - startX;
      const speed = 0.8;

      const walk = x * speed * -1;

      slide.style.transform = `translateX(${-walk + transLeftOffset}px)`;
      setWalk(walk);
    }
  };

  const handleMouseUpAndLeave = () => {
    if (slide && pressed) {
      slide.style.cursor = "grab";
      slide.style.transition = "transform 0.5s ease-in";

      let margin = 20;
      const widthPerSlide = (slide.offsetWidth + margin) / slidesView;
      const round = Math.round(walk / widthPerSlide);

      if (round === 0) {
        slide.style.transform = `translateX(-${widthPerSlide * active}px)`;
        setWalk(0);
      }
      if (round !== 0) {
        setActive(active + round);
        slide.style.transform = `translateX(-${
          widthPerSlide * (active + round)
        }px)`;
        setWalk(0);
      }

      const transX = Number(slide.style.transform.replace(/[^0-9.-]/g, ""));
      setTransLeftOffset(transX);

      // 첫번째 슬라이드에서 왼쪽으로 넘길려 할때
      if (transX > 0) {
        slide.style.transform = `translateX(0px)`;
        setActive(0);
        setWalk(0);
        setTransLeftOffset(0);
      }

      // 마지막 슬라이드에서 오른쪽으로 넘길려 할때
      const maxTransX =
        ((slide.offsetWidth + margin) / slidesView) * (count - slidesView) * -1;
      if (transX < maxTransX) {
        slide.style.transform = `translateX(${maxTransX}px)`;
        setActive(count - slidesView);
        setWalk(0);
        setTransLeftOffset(maxTransX);
      }
    }
    setPressed(false);
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLElement>) => {
    handleMouseUpAndLeave();
  };
  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    handleMouseUpAndLeave();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

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
    <EachSideContainer navPosition={navPosition} type={type}>
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
      <CarouselContainer
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        type={type}
      >
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
