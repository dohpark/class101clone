import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import palette from "../../../styles/palette";
import Badge from "../../atoms/Badge";
import Image from "../../atoms/Image";
import IconButton from "../../atoms/IconButton";
import Pagination from "../../molecules/Pagination";
import useProgressBar from "../../atoms/ProgressBar/useProgressBar";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

// type
interface ArrayProp {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  badge?: string;
  bgColor: string;
}

interface BannerProps {
  array: ArrayProp[];
}

interface StyledBackgroundColor {
  page: number;
  bgColorImgArray: string[][];
}

// function
const getBackgroundColor = (bgColorImgArray: string[][], page: number) => {
  const backgroundColor: string = bgColorImgArray[page][0];

  return css`
    background: ${backgroundColor};
  `;
};

// styled-components
const BannerOuterContainer = styled.div`
  box-sizing: border-box;
  padding-bottom: 34px;
  margin-bottom: 72px;
`;

const BannerInnerContainer = styled.div<StyledBackgroundColor>`
  ${(props) => getBackgroundColor(props.bgColorImgArray, props.page)}
`;

const BannerWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;

  @media screen and (max-width: 640px) {
    flex-direction: column-reverse;
    overflow-x: visible;
  }

  @media screen and (max-width: 1024px) {
    margin-left: 24px;
    margin-right: 24px;
  }

  @media screen and (min-width: 1024px) and (max-width: 1240px) {
    margin-left: 32px;
    margin-right: 32px;
  }

  @media screen and (min-width: 1240px) {
    max-width: 1176px;
  }
`;

const ImageCarouselContainer = styled.div`
  width: 58%;
  position: relative;
  top: 20px;
  overflow: hidden;

  @media screen and (max-width: 640px) {
    flex-direction: column-reverse;
    width: 100%;
  }
`;

const SlideProps = styled.div`
  margin: 0;
  width: 100%;
  display: float;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
  z-index: 0;
`;

const ImageContainer = styled.div`
  position: relative;

  .badge {
    position: absolute;
    top: 3%;
    left: 3%;
    z-index: 1;
    border-radius: 3px;
    padding: 8px;
    text-align: center;
  }
`;

const TextWrapper = styled.div`
  width: 42%;
  background-color: transparent;
  padding-left: 48px;
  padding-bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 640px) {
    margin: 0;
    padding: 0;
  }

  @media screen and (min-width: 640px) and (max-width: 1024px) {
    padding-left: 24px;
    padding-bottom: 12px;
  }

  .title {
    display: flex;
    max-width: 380px;
    align-items: center;
    font-size: 34px;
    font-weight: bold;
    color: ${palette.white};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;

    @media screen and (max-width: 640px) {
      margin-top: 26px;
    }

    @media screen and (max-width: 1024px) {
      font-size: 26px;
      line-height: 34px;
      max-width: 300px;
      min-width: 270px;
      margin-bottom: 0;
    }
  }

  .subtitle {
    margin: 10px 0 0;
    height: 40px;
    color: ${palette.gray100};
    font-weight: 500;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;

    @media screen and (max-width: 1024px) {
      font-size: 14px;
      max-width: 300px;
      min-width: 220px;
      line-height: 20px;
      font-weight: 400;
      color: ${palette.gray400};
    }
  }
`;

const PageBarButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;

  @media screen and (max-width: 640px) {
    display: none;
  }

  .number {
    position: relative;
    min-width: 45px;
    margin-right: 8px;
  }

  .leftButton {
    margin-left: 10px;
  }

  .rightButton {
    margin-right: 20px;
  }
`;

const CarouselTopBanner: React.FC<BannerProps> = ({ array }) => {
  // bgColorImg Array
  const bgColorImgArray = array.map((val) => {
    let bgColor: string;
    if (val.bgColor === "") bgColor = "green";
    else bgColor = val.bgColor;

    return [bgColor, val.img];
  });

  // imagesrcTitleBadge Array
  const imgsrcTitle = array.map((val) => {
    let badge: string;
    if (!val.badge) badge = "";
    else badge = val.badge;

    return [val.img, val.title, badge];
  });

  // progress bar
  const { resetAnimation, ProgressBar } = useProgressBar();

  // swipe effect
  const [page, setPage] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const lastIndex = array.length - 1;

  // title subtitle
  let title: string;
  let subtitle: string;

  if (page < 0) {
    title = array[lastIndex].title;
    subtitle = array[lastIndex].subtitle;
  } else if (page > lastIndex) {
    title = array[0].title;
    subtitle = array[0].subtitle;
  } else {
    title = array[page].title;
    subtitle = array[page].subtitle;
  }

  // page
  if (page < 0) {
    setPage(lastIndex);
  } else if (page > lastIndex) {
    setPage(0);
  }

  // click event
  const onClickLeft = (event: React.MouseEvent<HTMLElement>) => {
    setPage(page - 1);
    if (page < 0) {
      setPage(0);
    }
  };
  const onClickRight = (event: React.MouseEvent<HTMLElement>) => {
    setPage(page + 1);
    if (page > lastIndex - 1) {
      setPage(0);
    }
  };

  // swipe aimation
  const { innerWidth } = useWindowDimensions();
  useEffect(() => {
    const { current } = slideRef;
    if (current != null) {
      const width = current.offsetWidth * page;
      current.style.transform = `translateX(calc(-${width}px))`;
      resetAnimation();
    }
  }, [page, innerWidth]);

  // autoplay
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setPage(page + 1);
  //   }, 5 * 1000);
  //   return () => clearInterval(id);
  // }, [page]);

  return (
    <BannerOuterContainer>
      <BannerInnerContainer bgColorImgArray={bgColorImgArray} page={page}>
        <BannerWrapper>
          <ImageCarouselContainer>
            <SlideProps ref={slideRef}>
              {imgsrcTitle.map(([src, title, badge]) => (
                <ImageContainer key={title}>
                  {badge !== "" && (
                    <Badge size="md" className="badge" backgroundColor="red">
                      {badge}
                    </Badge>
                  )}
                  <a
                    target="slide"
                    href="https://github.com/dohpark/class101clone"
                  >
                    <Image src={src} alt={title} expand={false} />
                  </a>
                </ImageContainer>
              ))}
            </SlideProps>
          </ImageCarouselContainer>
          <TextWrapper>
            <div>
              <p className="title">{title}</p>
              <p className="subtitle">{subtitle}</p>
            </div>
            <PageBarButtonWrapper>
              <Pagination
                className="number"
                paginationType="number"
                slidesPerView={1}
                pageIndex={page}
                childrenCount={lastIndex + 1}
                onClickPaginationHandler={() => {}}
              />
              <ProgressBar className="progressBar" />
              <IconButton
                className="leftButton"
                iconName="ChevronLeft"
                fillColor="white"
                backgroundColor="transparent"
                onClick={onClickLeft}
              />
              <IconButton
                className="rightButton"
                iconName="ChevronRight"
                fillColor="white"
                backgroundColor="transparent"
                onClick={onClickRight}
              />
            </PageBarButtonWrapper>
          </TextWrapper>
        </BannerWrapper>
      </BannerInnerContainer>
    </BannerOuterContainer>
  );
};

export default CarouselTopBanner;
