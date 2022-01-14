import styled, { css } from "styled-components";
import palette from "../../../styles/palette";
import Image from "../../atoms/Image";
import ProgressBar from "../../atoms/ProgressBar";
import Pagination from "../Pagination";

interface StyledBannerContainer {
  bgColor: string;
  type: "bottom" | "top";
}

interface StyledType {
  type: "bottom" | "top";
}

const BannerBackground = styled.div<StyledType>`
  ${(props) => {
    if (props.type === "bottom")
      return css`
        padding-top: 34px;
      `;
    else if (props.type === "top")
      return css`
        padding-bottom: 34px;
      `;
  }}
`;

const BannerContainer = styled.div<StyledBannerContainer>`
  ${(props) => {
    if (props.type === "bottom")
      return css`
        background-color: ${props.bgColor};
        display: flex;
        flex-wrap: wrap-reverse;
        height: 210px;
      `;
    else if (props.type === "top")
      return css`
        background-color: ${props.bgColor};
      `;
  }}
`;

const BannerWrapper = styled.div<StyledType>`
  max-width: 1176px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  ${(props) => {
    if (props.type === "bottom")
      return css`
        justify-content: space-between;
        position: relative;
      `;
    else if (props.type === "top")
      return css`
        height: 450px;
      `;
  }}
`;

const ImageWrapper = styled.div<StyledType>`
  ${(props) => {
    if (props.type === "bottom")
      return css`
        position: absolute;
        right: 0;
        bottom: -1px;
        display: block;
        height: 244px;
      `;
    else if (props.type === "top")
      return css`
        width: 58%;
        position: relative;
        top: 35px;
      `;
  }}
`;

const TextWrapper = styled.div<StyledType>`
  ${(props) => {
    if (props.type === "bottom")
      return css`
        display: flex;
        align-items: left;
        flex-direction: column;
        justify-content: center;

        .title {
          font-size: 32px;
          font-weight: bold;
          margin: 0px;
          color: ${palette.white};
        }

        .subtitle {
          font-size: 14px;
          margin: 6px 0px 0px;
          color: ${palette.white};
        }

        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 24px;
          font-size: 14px;
          height: 32px;
          width: 90px;
          border-radius: 3px;
          background-color: ${palette.white};
        }
      `;
    else if (props.type === "top")
      return css`
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
  }}
`;

interface BannerProps {
  title: string;
  subtitle: string;
  img: string;
  badge?: string;
  bgColor: string;
  type: "top" | "bottom";
  slidesView?: number;
  active?: number;
  count?: number;
  onClickPaginationHandler?: (index: number) => void;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  img,
  badge,
  bgColor,
  type,
  slidesView = 0,
  active = 0,
  count = 0,
  onClickPaginationHandler = () => {},
}) => {
  if (bgColor === "") {
    bgColor = `${palette.gray700}`;
  }

  return (
    <BannerBackground type={type}>
      <BannerContainer bgColor={bgColor} type={type}>
        {type === "top" && (
          <BannerWrapper type={type}>
            <ImageWrapper type={type}>
              <Image src={img} alt={title} expand={false} />
            </ImageWrapper>
            <TextWrapper type={type}>
              <div className="text">
                <p className="title">{title}</p>
                <p className="subtitle">{subtitle}</p>
              </div>
              <Pagination
                className="number"
                paginationType="number"
                slidesPerView={slidesView}
                active={active}
                childrenCount={count}
                onClickPaginationHandler={onClickPaginationHandler!}
              />
              <ProgressBar />
            </TextWrapper>
          </BannerWrapper>
        )}
        {type === "bottom" && (
          <BannerWrapper type={type}>
            <TextWrapper type={type}>
              <div className="title">{title}</div>
              <div className="subtitle">{subtitle}</div>
              <div className="button">더 알아보기</div>
            </TextWrapper>
            <ImageWrapper type={type}>
              <Image src={img} alt={title} expand={false} />
            </ImageWrapper>
          </BannerWrapper>
        )}
      </BannerContainer>
    </BannerBackground>
  );
};

export default Banner;
