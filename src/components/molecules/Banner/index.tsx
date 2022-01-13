import styled from "styled-components";
import palette from "../../../styles/palette";
import Image from "../../atoms/Image";

interface StyledBannerContainer {
  bgColor: string;
}

const BannerBackground = styled.div`
  padding-top: 34px;
`;

const BannerContainer = styled.div<StyledBannerContainer>`
  background-color: ${(props) => props.bgColor};
  display: flex;
  flex-wrap: wrap-reverse;
  height: 210px;
`;

const BannerWrapper = styled.div`
  max-width: 1176px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  position: relative;

  .textBox {
    display: flex;
    align-items: left;
    flex-direction: column;
    justify-content: center;
  }

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

  .imageWrapper {
    position: absolute;
    right: 0;
    bottom: -1px;
    display: block;
    height: 244px;
  }
`;

interface BannerProps {
  title: string;
  subtitle: string;
  img: string;
  badge?: string;
  bgColor: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  img,
  badge,
  bgColor,
}) => {
  return (
    <BannerBackground>
      <BannerContainer bgColor={bgColor}>
        <BannerWrapper>
          <div className="textBox">
            <div className="title">{title}</div>
            <div className="subtitle">{subtitle}</div>
            <div className="button">더 알아보기</div>
          </div>
          <div className="imageWrapper">
            <Image src={img} alt={title} expand={false} />
          </div>
        </BannerWrapper>
      </BannerContainer>
    </BannerBackground>
  );
};

export default Banner;
