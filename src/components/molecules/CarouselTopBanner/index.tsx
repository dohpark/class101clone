import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import Badge from "../../atoms/Badge";
import Image from "../../atoms/Image";
import IconButton from "../../atoms/IconButton";
import Pagination from "../Pagination";
import useProgressBar from "../../atoms/ProgressBar/useProgressBar";

const BannerBackground = styled.div`
  padding-bottom: 34px;
`;

const BannerContainer = styled.div`
  background-color: pink;
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

  .text {
    padding-top: 56px;
  }

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

  .number {
    position: relative;
    transition: none;
  }
`;

const PBRWrapper = styled.div`
  display: flex;
  align-items: center;

  .number {
    width: 60px;
    margin-right: 8px;
  }

  .bar {
    width: 70%;
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
  const imgsrcTitle = array.map((val) => {
    let badge: string;
    if (!val.badge) badge = "";
    else badge = val.badge;

    return [val.img, val.title, badge];
  });
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
  }, [page, resetAnimation]);

  // autoplay
  useEffect(() => {
    const id = setInterval(() => {
      setPage(page + 1);
    }, 5 * 1000);
    return () => clearInterval(id);
  }, [page]);

  return (
    <BannerBackground>
      <BannerContainer>
        <BannerWrapper>
          <ImageCarouselContainer>
            <SlideProps ref={slideRef}>
              {imgsrcTitle.map((val) => (
                <ImageContainer>
                  {val[2] !== "" && (
                    <Badge size="md" className="badge" backgroundColor="red">
                      {val[2]}
                    </Badge>
                  )}
                  <Image src={val[0]} alt={val[1]} expand={false} />
                </ImageContainer>
              ))}
            </SlideProps>
          </ImageCarouselContainer>
          <TextWrapper>
            <div className="text">
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
                <ProgressBar className="bar" />
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
            </div>
          </TextWrapper>
        </BannerWrapper>
      </BannerContainer>
    </BannerBackground>
  );
};

export default CarouselTopBanner;
