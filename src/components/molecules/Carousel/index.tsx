import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
} from "react";
import { useState, useRef } from "react";
import styled, { css } from "styled-components";
import IconButton from "../../atoms/IconButton";
import Pagination from "../Pagination";

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

        .leftButton {
          margin: 0;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        .rightButton {
          margin: 0;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
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

          @media screen and (min-width: 1024px) {
            visibility: hidden;
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
            visibility: hidden;
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
`;

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: auto;
  display: flex;
  align-items: center;

  .circle {
    display: absolute;
    bottom: 10%;
    left: 46%;
    z-index: 333;
  }
`;

const SlideProps = styled.section<StyledSlideProps>`
  width: 100%;
  display: flex;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
  position: relative;
  z-index: 0;

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
  slidesView: number;
  navPosition: "rightIn" | "eachSide";
  paginationType?: "circle" | "number";
  autoplay?: boolean;
  children: React.ReactNode;
  iconBackgroundColor?: "black" | "white" | "transparent";
  iconColor?: "black" | "white";
}

const Carousel: React.FC<CarouselProps> = ({
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

  const onClickPaginationHandler = (index: number) => {
    setActive(index);
  };

  // swipe effect
  const [active, setActive] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = slideRef;
    if (current != null) {
      console.log(current.offsetWidth);
      const width = ((current.offsetWidth + 20) / slidesView) * active;
      current.style.transform = `translateX(calc(-${width}px))`;
    }
  }, [active, slidesView]);

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
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        slidesView,
        active,
        count,
        onClickPaginationHandler,
      });
    }
    return child;
  });

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
        <SlideProps slidesView={slidesView} count={count} ref={slideRef}>
          {childrenWithProps}
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
      </CarouselContainer>
    </EachSideContainer>
  );
};

export default Carousel;
