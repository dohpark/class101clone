import styled from "styled-components";
import palette from "../../../styles/palette";
import Image from "../../atoms/Image";

// type
interface BannerProps {
  title: string;
  subtitle: string;
  img: string;
  bgColor: string;
}

interface StyledBannerContainer {
  bgColor: string;
}

// styled-components
const BannerOuterContainer = styled.div`
  padding-top: 34px;

  a {
    text-decoration: none;
    color: ${palette.black};
  }
`;

const BannerInnerContainer = styled.div<StyledBannerContainer>`
  background-color: ${(props) => props.bgColor};
  display: flex;
  flex-wrap: wrap-reverse;
  height: 210px;

  @media screen and (max-width: 1024px) {
    height: 320px;
  }
`;

const BannerWrapper = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;

  justify-content: space-between;
  position: relative;

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

const ImageContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: -1px;
  display: block;
  height: 244px;
  z-index: 0;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: left;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    padding-top: 32px;
    justify-content: left;
  }

  .title {
    font-size: 32px;
    font-weight: bold;
    margin: 0px;
    color: ${palette.white};
    word-break: keep-all;
    z-index: 1;

    @media screen and (max-width: 1024px) {
      font-size: 24px;
      max-width: 230px;
    }
  }

  .subtitle {
    font-size: 14px;
    margin: 6px 0px 0px;
    color: ${palette.white};
    word-break: keep-all;
    z-index: 1;
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
    z-index: 1;
  }
`;

const Banner: React.FC<BannerProps> = ({ title, subtitle, img, bgColor }) => {
  return (
    <BannerOuterContainer>
      <a target="slide" href="https://github.com/dohpark/class101clone">
        <BannerInnerContainer bgColor={bgColor}>
          <BannerWrapper>
            <TextContainer>
              <div className="title">{title}</div>
              <div className="subtitle">{subtitle}</div>
              <div className="button">더 알아보기</div>
            </TextContainer>
            <ImageContainer>
              <Image src={img} alt={title} expand={false} />
            </ImageContainer>
          </BannerWrapper>
        </BannerInnerContainer>
      </a>
    </BannerOuterContainer>
  );
};

export default Banner;
