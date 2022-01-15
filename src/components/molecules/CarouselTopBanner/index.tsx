import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import palette from "../../../styles/palette";
import Badge from "../../atoms/Badge";
import Image from "../../atoms/Image";
import IconButton from "../../atoms/IconButton";
import Pagination from "../Pagination";
import useProgressBar from "../../atoms/ProgressBar/useProgressBar";

const getBackgroundColor = (bgColorImgArray: string[][], page: number) => {
  const backgroundColor: string = bgColorImgArray[page][0];

  return css`
    background: ${backgroundColor};
  `;
};

interface StyledBackgroundColor {
  page: number;
  bgColorImgArray: string[][];
}

const BannerBackground = styled.div`
  padding-bottom: 34px;
`;

const BannerContainer = styled.div<StyledBackgroundColor>`
  ${(props) => getBackgroundColor(props.bgColorImgArray, props.page)}
`;

const BannerWrapper = styled.div`
  max-width: 1176px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  height: 450px;
`;

const ImageCarouselContainer = styled.div`
  width: 58%;
  position: relative;
  top: 35px;
  overflow: hidden;
`;

const SlideProps = styled.div`
  margin: 0;
  height: 100%;
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
  padding-bottom: 32px;
`;

const TextContent = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 56px;

  .title {
    display: flex;
    max-width: 380px;
    align-items: center;
    font-size: 34px;
    font-weight: bold;
    color: ${palette.white};
  }

  .subtitle {
    margin: 10px 0 0;
    color: ${palette.gray100};
    font-weight: 500;
    max-width: 300px;
  }
`;

const PBRWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 55px;

  .number {
    position: relative;
    width: 60px;
    margin-right: 8px;
  }

  .rightButton {
    margin-right: 20px;
  }
`;

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

  useEffect(() => {
    const { current } = slideRef;
    if (current != null) {
      const width = current.offsetWidth * page;
      current.style.transform = `translateX(calc(-${width}px))`;
      resetAnimation();
    }
  }, [page]);

  // autoplay
  useEffect(() => {
    const id = setInterval(() => {
      setPage(page + 1);
    }, 5 * 1000);
    return () => clearInterval(id);
  }, [page]);

  return (
    <BannerBackground>
      <BannerContainer bgColorImgArray={bgColorImgArray} page={page}>
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
                  <Image src={src} alt={title} expand={false} />
                </ImageContainer>
              ))}
            </SlideProps>
          </ImageCarouselContainer>
          <TextWrapper>
            <TextContent>
              <div>
                <p className="title">{title}</p>
                <p className="subtitle">{subtitle}</p>
              </div>
              <PBRWrapper>
                <Pagination
                  className="number"
                  paginationType="number"
                  slidesPerView={1}
                  active={page}
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
              </PBRWrapper>
            </TextContent>
          </TextWrapper>
        </BannerWrapper>
      </BannerContainer>
    </BannerBackground>
  );
};

export default CarouselTopBanner;
