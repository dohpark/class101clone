import styled from "styled-components";
import palette from "../../../styles/palette";
import Image from "../../atoms/Image";

interface StyledBannerContainer {
  bgColor: string;
}

interface StyledType {}

const BannerBackground = styled.div<StyledType>`
  padding-top: 34px;
`;

const BannerContainer = styled.div<StyledBannerContainer>`
  background-color: ${(props) => props.bgColor};
  display: flex;
  flex-wrap: wrap-reverse;
  height: 210px;
`;

const BannerWrapper = styled.div<StyledType>`
  max-width: 1176px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;

  justify-content: space-between;
  position: relative;
`;

const ImageWrapper = styled.div<StyledType>`
  position: absolute;
  right: 0;
  bottom: -1px;
  display: block;
  height: 244px;
`;

const TextWrapper = styled.div<StyledType>`
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

interface BannerProps {
  title: string;
  subtitle: string;
  img: string;
  badge?: string;
  bgColor: string;
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
  slidesView = 0,
  active = 0,
  count = 0,
  onClickPaginationHandler = () => {},
}) => {
  if (bgColor === "") {
    bgColor = `${palette.gray700}`;
  }

  return (
    <BannerBackground>
      <BannerContainer bgColor={bgColor}>
        <BannerWrapper>
          <TextWrapper>
            <div className="title">{title}</div>
            <div className="subtitle">{subtitle}</div>
            <div className="button">더 알아보기</div>
          </TextWrapper>
          <ImageWrapper>
            <Image src={img} alt={title} expand={false} />
          </ImageWrapper>
        </BannerWrapper>
      </BannerContainer>
    </BannerBackground>
  );
};

export default Banner;
