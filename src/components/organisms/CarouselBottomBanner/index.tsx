import React, { Children, useEffect } from "react";
import { useState, useRef } from "react";
import styled, { css } from "styled-components";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import IconButton from "../../atoms/IconButton";
import Pagination from "../../molecules/Pagination";

// general type
type carouselTypes = "banner" | "popular" | "default";
type navPosition = "rightIn" | "eachSide";

// css types
interface StyledSlideContainer {
  slidesPerView: number;
  slidesCount: number;
  type: carouselTypes;
}

interface StyledButtonContainer {
  navPosition: navPosition;
}

interface StyledCarouselOuterContainer {
  navPosition: navPosition;
  type: carouselTypes;
}

interface StyledCarouselInnerContainer {
  type: carouselTypes;
}

// function component type
interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: carouselTypes;
  slidesPerView: number;
  navPosition: navPosition;
  paginationType?: "circle" | "number";
  autoplay?: boolean;
  children: React.ReactNode;
  buttonBackgroundColor?: "black" | "white" | "transparent";
  buttonIconColor?: "black" | "white";
}

// const
const SLIDE_MARGIN = 15;

// prop function
const slidesPerViewWidth = (slidesPerView: number, slidesCount: number) => {
  if (slidesCount < slidesPerView) {
    return css`
      width: calc(
        (100% - ${SLIDE_MARGIN}px * ${slidesPerView - 1}) / ${slidesPerView}
      );
    `;
  } else {
    return css`
      min-width: calc(
        (100% - ${SLIDE_MARGIN}px * ${slidesPerView - 1}) / ${slidesPerView}
      );
    `;
  }
};

// css function
const getWidthPercentage = (type: carouselTypes) => {
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

const getNavPosition = (navPosition: navPosition) => {
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

// styled components
const CarouselOuterContainer = styled.div<StyledCarouselOuterContainer>`
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

const CarouselInnerContainer = styled.div<StyledCarouselInnerContainer>`
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

const SlideContainer = styled.div<StyledSlideContainer>`
  width: 100%;
  display: flex;
  transition: transform 0.5s ease-in-out;
  position: relative;
  z-index: 0;

  @media screen and (max-width: 1024px) {
    ${(props) => getWidthPercentage(props.type)};
  }

  > div {
    ${(props) => slidesPerViewWidth(props.slidesPerView, props.slidesCount)};
    margin: 0 ${SLIDE_MARGIN}px 0 0;
    position: relative;
    left: 0;
  }
`;

const ButtonContainer = styled.div<StyledButtonContainer>`
  ${(props) => getNavPosition(props.navPosition)};
`;

const CarouselBottomBanner: React.FC<CarouselProps> = ({
  type = "default",
  slidesPerView,
  navPosition,
  paginationType,
  autoplay = false,
  buttonBackgroundColor = "transparent",
  buttonIconColor = "black",
  children,
}) => {
  const slidesCount = Children.count(children);

  // responsiveSlidesPerView
  const defaultSlidesPerView = 2;
  const popularSlidesPerView = 1;
  const bannerSlidesPerView = 1;

  const { innerWidth } = useWindowDimensions();
  if (innerWidth <= 1024 && type === "default")
    slidesPerView = defaultSlidesPerView;
  if (innerWidth <= 1024 && type === "popular")
    slidesPerView = popularSlidesPerView;
  if (innerWidth <= 1024 && type === "banner")
    slidesPerView = bannerSlidesPerView;

  // swipe effect
  const [slideIndex, setSlideIndex] = useState(0);
  const maxSlideIndex = slidesCount - slidesPerView;
  const slideRef = useRef<HTMLDivElement>(null);
  const slide = slideRef.current;

  // 화면 크기 변화 및 반응형 대응
  useEffect(() => {
    if (slide) {
      slide.style.transition = "transform 0s cubic-bezier(1,-0.01, 1, 1)";

      if (slideIndex > maxSlideIndex) setSlideIndex(maxSlideIndex);
      const width =
        ((slide.offsetWidth + SLIDE_MARGIN) / slidesPerView) * slideIndex;

      slide.style.transform = `translateX(-${width}px)`;
      const transX = Number(slide.style.transform.replace(/[^0-9.-]/g, ""));
      setTransLeftOffset(transX);
    }
  }, [innerWidth, maxSlideIndex, slidesPerView]);

  // pageIndex 변화 대응
  useEffect(() => {
    if (slide) {
      slide.style.transition = "transform 0.5s ease-in";
      const width =
        ((slide.offsetWidth + SLIDE_MARGIN) / slidesPerView) * slideIndex;

      slide.style.transform = `translateX(-${width}px)`;

      const transX = Number(slide.style.transform.replace(/[^0-9.-]/g, ""));
      setTransLeftOffset(transX);
    }
  }, [slideIndex]);

  // click event
  const onClickLeft = (event: React.MouseEvent<HTMLElement>) => {
    if (autoplay) {
      setSlideIndex(slideIndex - 1);
      if (slideIndex <= 0) {
        setSlideIndex(slidesCount - slidesPerView);
      }
    } else {
      if (slideIndex === 0) return;
      setSlideIndex(slideIndex - 1);
    }
  };
  const onClickRight = (event: React.MouseEvent<HTMLElement>) => {
    if (autoplay) {
      setSlideIndex(slideIndex + 1);
      if (slideIndex > slidesCount - slidesPerView - 1) {
        setSlideIndex(0);
      }
    } else {
      if (slidesCount < slidesPerView) return;
      if (slideIndex === slidesCount - slidesPerView) return;
      setSlideIndex(slideIndex + 1);
    }
  };

  // button disabled
  const leftButtonDisabled = () => {
    if (autoplay) return false;
    if (slideIndex === 0) return true;
  };
  const rightButtonDisabled = () => {
    if (autoplay) return false;
    if (slideIndex === slidesCount - slidesPerView) return true;
  };

  // autoplay
  useEffect(() => {
    const id = setInterval(() => {
      if (autoplay) {
        setSlideIndex(slideIndex + 1);
        if (slideIndex > slidesCount - slidesPerView - 1) {
          setSlideIndex(0);
        }
      }
    }, 5 * 1000);
    return () => clearInterval(id);
  }, [slideIndex, autoplay, slidesCount, slidesPerView]);

  // drag & scroll
  const [pressed, setPressed] = useState(false);
  const [startCoordinate, setStartCoordinate] = useState(0);
  const [transLeftOffset, setTransLeftOffset] = useState(0);
  const [walk, setWalk] = useState(0);
  const [drag, setDrag] = useState(false);
  if (slide) slide.ondragstart = () => false;

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    setPressed(true);
    if (slide) {
      slide.style.cursor = "grabbing";
      slide.style.transition = "transform 0s cubic-bezier(1,-0.01, 1, 1)";
      setStartCoordinate(event.pageX);
      setDrag(false);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (pressed && slide && startCoordinate) {
      const mouseMovedDistance = event.pageX - startCoordinate;
      const slideSpeed = 0.8;

      const walk = mouseMovedDistance * slideSpeed * -1;

      slide.style.transform = `translateX(${-walk + transLeftOffset}px)`;

      setWalk(walk);
      setDrag(true);
    }
  };

  const handleMouseUpAndLeave = () => {
    if (slide && pressed) {
      slide.style.cursor = "grab";
      slide.style.transition = "transform 0.5s ease-in";

      const widthPerSlide = (slide.offsetWidth + SLIDE_MARGIN) / slidesPerView;
      const swipePageCount = Math.round(walk / widthPerSlide);

      if (swipePageCount === 0) {
        slide.style.transform = `translateX(-${widthPerSlide * slideIndex}px)`;
        setWalk(0);
      }
      if (swipePageCount !== 0) {
        setSlideIndex(slideIndex + swipePageCount);
        slide.style.transform = `translateX(-${
          widthPerSlide * (slideIndex + swipePageCount)
        }px)`;
        setWalk(0);
      }

      const transX = Number(slide.style.transform.replace(/[^0-9.-]/g, ""));
      setTransLeftOffset(transX);

      // 첫번째 슬라이드에서 왼쪽으로 넘길려 할때 제어
      if (transX > 0) {
        slide.style.transform = `translateX(0px)`;
        setSlideIndex(0);
        setWalk(0);
        setTransLeftOffset(0);
      }

      // 마지막 슬라이드에서 오른쪽으로 넘길려 할때 제어
      const maxTransX =
        ((slide.offsetWidth + SLIDE_MARGIN) / slidesPerView) *
        (slidesCount - slidesPerView) *
        -1;
      if (transX < maxTransX) {
        slide.style.transform = `translateX(${maxTransX}px)`;
        setSlideIndex(slidesCount - slidesPerView);
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
    if (drag) event.preventDefault();
  };

  // touch drag
  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    setPressed(true);
    if (slide) {
      slide.style.cursor = "grabbing";
      slide.style.transition = "transform 0s cubic-bezier(1,-0.01, 1, 1)";
      setStartCoordinate(event.targetTouches[0].pageX);
      setDrag(false);
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLElement>) => {
    if (pressed && slide && startCoordinate) {
      const mouseMovedDistance = event.targetTouches[0].pageX - startCoordinate;
      const slideSpeed = 0.8;

      const walk = mouseMovedDistance * slideSpeed * -1;

      slide.style.transform = `translateX(${-walk + transLeftOffset}px)`;

      setWalk(walk);
      setDrag(true);
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    handleMouseUpAndLeave();
  };

  // pagination
  let paginationActive: boolean;
  if (paginationType) paginationActive = true;
  else paginationActive = false;

  const onClickPaginationHandler = (index: number) => {
    setSlideIndex(index);
  };

  return (
    <CarouselOuterContainer navPosition={navPosition} type={type}>
      {navPosition === "eachSide" && (
        <IconButton
          className="leftButton"
          iconName="ChevronLeft"
          fillColor={buttonIconColor}
          backgroundColor={buttonBackgroundColor}
          onClick={onClickLeft}
          disabled={leftButtonDisabled()}
        />
      )}
      {navPosition === "eachSide" && (
        <IconButton
          className="rightButton"
          iconName="ChevronRight"
          fillColor={buttonIconColor}
          backgroundColor={buttonBackgroundColor}
          onClick={onClickRight}
          disabled={rightButtonDisabled()}
        />
      )}
      <CarouselInnerContainer
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
        type={type}
      >
        <SlideContainer
          slidesPerView={slidesPerView}
          slidesCount={slidesCount}
          ref={slideRef}
          type={type}
        >
          {children}
        </SlideContainer>
        {navPosition !== "eachSide" && (
          <ButtonContainer navPosition={navPosition}>
            <IconButton
              className="leftButton"
              iconName="ChevronLeft"
              fillColor={buttonIconColor}
              backgroundColor={buttonBackgroundColor}
              onClick={onClickLeft}
              disabled={leftButtonDisabled()}
            />
            <IconButton
              className="rightButton"
              iconName="ChevronRight"
              fillColor={buttonIconColor}
              backgroundColor={buttonBackgroundColor}
              onClick={onClickRight}
              disabled={rightButtonDisabled()}
            />
          </ButtonContainer>
        )}
      </CarouselInnerContainer>
      {paginationActive && (
        <Pagination
          className="circle"
          paginationType={paginationType}
          slidesPerView={slidesPerView}
          pageIndex={slideIndex}
          childrenCount={slidesCount}
          onClickPaginationHandler={onClickPaginationHandler}
        />
      )}
    </CarouselOuterContainer>
  );
};
export default CarouselBottomBanner;
