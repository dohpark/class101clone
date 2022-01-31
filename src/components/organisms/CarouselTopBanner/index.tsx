import React from "react";
import styled, { css } from "styled-components";
import palette from "../../../styles/palette";
import Badge from "../../atoms/Badge";
import Image from "../../atoms/Image";
import useCarousel from "../../molecules/Carousel";

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
  slideIndex: number;
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
  overflow: hidden;
`;

const BannerInnerContainer = styled.div<StyledBackgroundColor>`
  ${(props) => getBackgroundColor(props.bgColorImgArray, props.slideIndex)}
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

  .imageCarouselContainer {
    width: 58%;
    position: relative;
    top: 20px;
    overflow: hidden;

    @media screen and (max-width: 640px) {
      flex-direction: column-reverse;
      overflow: visible;
      width: calc(100% - 48px);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;

  .badge {
    top: 12px;
    left: 12px;
    position: absolute;
    z-index: 1;
    border-radius: 3px;
    padding: 6px 8px;
    text-align: center;

    @media screen and (max-width: 1024px) {
      top: 10px;
      left: 10px;
      font-size: 9px;
      font-weight: 600;
      padding: 6px 8px;
    }
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
    width: 100%;
    margin: 0;
    padding: 0;
  }

  @media screen and (min-width: 640px) and (max-width: 1024px) {
    padding-left: 24px;
    padding-bottom: 12px;
  }

  .title {
    padding-top: 40px;
    font-size: 34px;
    font-weight: bold;
    color: ${palette.white};
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 40px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;

    @media screen and (max-width: 640px) {
      padding-top: 0;
      margin-top: 26px;
    }

    @media screen and (max-width: 1024px) {
      font-size: 26px;
      line-height: 34px;
      margin-bottom: 0;
    }
  }

  .subtitle {
    margin: 10px 0 0;
    height: 40px;
    color: ${palette.gray100};
    font-weight: 500;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;

    @media screen and (max-width: 1024px) {
      font-size: 14px;
      font-weight: 400;
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

  const {
    LeftButton,
    RightButton,
    CarouselContainer,
    slideIndex,
    PaginationProp,
    ProgressBarProp,
  } = useCarousel(array.length, 1, 1, false);

  // title subtitle
  let title: string;
  let subtitle: string;
  const lastIndex = array.length - 1;

  if (slideIndex < 0) {
    title = array[lastIndex].title;
    subtitle = array[lastIndex].subtitle;
  } else if (slideIndex > lastIndex) {
    title = array[0].title;
    subtitle = array[0].subtitle;
  } else {
    title = array[slideIndex].title;
    subtitle = array[slideIndex].subtitle;
  }

  return (
    <BannerOuterContainer>
      <BannerInnerContainer
        bgColorImgArray={bgColorImgArray}
        slideIndex={slideIndex}
      >
        <BannerWrapper>
          {CarouselContainer({
            className: "imageCarouselContainer",
            children: imgsrcTitle.map(([src, title, badge]) => (
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
            )),
          })}
          <TextWrapper>
            <div>
              <p className="title">{title}</p>
              <p className="subtitle">{subtitle}</p>
            </div>
            <PageBarButtonWrapper>
              <PaginationProp className="number" paginationType="number" />
              <ProgressBarProp className="progressBar" />
              <LeftButton
                className="leftButton"
                buttonIconColor="white"
                buttonBackgroundColor="transparent"
              />
              <RightButton
                className="rightButton"
                buttonIconColor="white"
                buttonBackgroundColor="transparent"
              />
            </PageBarButtonWrapper>
          </TextWrapper>
        </BannerWrapper>
      </BannerInnerContainer>
    </BannerOuterContainer>
  );
};

export default CarouselTopBanner;
