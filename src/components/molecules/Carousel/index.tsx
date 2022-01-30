import React, { useEffect } from "react";
import { useState, useRef } from "react";
import styled, { css } from "styled-components";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import IconButton from "../../atoms/IconButton";
import useProgressBar from "../../atoms/ProgressBar/useProgressBar";
import Pagination from "../Pagination";

// css types
interface StyledSlideContainer {
  slidesPerView: number;
  slidesCount: number;
}

// function component type
interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
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

// styled components
const CarouselInnerContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: auto;
  display: flex;
  align-items: center;
`;

const SlideContainer = styled.div<StyledSlideContainer>`
  width: 100%;
  display: flex;
  transition: transform 0.5s ease-in-out;
  position: relative;
  z-index: 0;

  > div {
    ${(props) => slidesPerViewWidth(props.slidesPerView, props.slidesCount)};
    margin: 0 ${SLIDE_MARGIN}px 0 0;
    position: relative;
    left: 0;
  }
`;

const useCarousel = (
  slidesCount: number,
  slidesPerView: number,
  responsiveSlidesPerView: number,
  autoplay: boolean = false
) => {
  const { innerWidth } = useWindowDimensions();
  if (innerWidth <= 1024) slidesPerView = responsiveSlidesPerView;

  // progress bar
  const { resetAnimation, ProgressBar } = useProgressBar();

  // swipe effect
  const [slideIndex, setSlideIndex] = useState(0);
  const maxSlideIndex = slidesCount - slidesPerView;
  const slideRef = useRef<HTMLDivElement>(null);
  const slide = slideRef.current;

  if (slideIndex < 0) {
    setSlideIndex(slidesCount - 1);
  } else if (slideIndex > slidesCount - 1) {
    setSlideIndex(0);
  }

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
      resetAnimation();
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
      resetAnimation();
    }
  }, [slideIndex]);

  // click event
  const onClickLeft = (event: React.MouseEvent<HTMLElement>) => {
    console.log(slideIndex);
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
      const maxTransX =
        ((slide.offsetWidth + SLIDE_MARGIN) / slidesPerView) *
        (slidesCount - slidesPerView) *
        -1;

      if (transX > 0 && autoplay === false) {
        slide.style.transform = `translateX(0px)`;
        setSlideIndex(0);
        setWalk(0);
        setTransLeftOffset(0);
      }

      // 마지막 슬라이드에서 오른쪽으로 넘길려 할때 제어
      if (transX < maxTransX && autoplay === false) {
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
  const onClickPaginationHandler = (index: number) => {
    setSlideIndex(index);
  };

  // 변경중
  const LeftButton: React.FC<{
    buttonIconColor: string;
    buttonBackgroundColor: "black" | "white" | "transparent";
    className: string;
  }> = ({ buttonIconColor, buttonBackgroundColor, className }) => {
    return (
      <IconButton
        className={className}
        iconName="ChevronLeft"
        fillColor={buttonIconColor}
        backgroundColor={buttonBackgroundColor}
        onClick={onClickLeft}
        disabled={leftButtonDisabled()}
      />
    );
  };

  const RightButton: React.FC<{
    buttonIconColor: string;
    buttonBackgroundColor: "black" | "white" | "transparent";
    className: string;
  }> = ({ buttonIconColor, buttonBackgroundColor, className }) => {
    return (
      <IconButton
        className={className}
        iconName="ChevronRight"
        fillColor={buttonIconColor}
        backgroundColor={buttonBackgroundColor}
        onClick={onClickRight}
        disabled={rightButtonDisabled()}
      />
    );
  };

  const ProgressBarProp: React.FC<{ className: string }> = ({ className }) => {
    return <ProgressBar className={className} />;
  };

  const PaginationProp: React.FC<{
    paginationType: "circle" | "number";
    className: string;
  }> = ({ paginationType, className }) => {
    return (
      <Pagination
        className={className}
        paginationType={paginationType}
        slidesPerView={slidesPerView}
        pageIndex={slideIndex}
        childrenCount={slidesCount}
        onClickPaginationHandler={onClickPaginationHandler}
      />
    );
  };

  const CarouselContainer: React.FC<CarouselProps> = ({
    className,
    children,
  }) => {
    return (
      <CarouselInnerContainer
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
        className={className}
      >
        <SlideContainer
          slidesPerView={slidesPerView}
          slidesCount={slidesCount}
          ref={slideRef}
        >
          {children}
        </SlideContainer>
      </CarouselInnerContainer>
    );
  };

  return {
    LeftButton,
    RightButton,
    ProgressBarProp,
    PaginationProp,
    CarouselContainer,
    slideIndex,
  };
};

export default useCarousel;
