import styled from "styled-components";
import palette from "../../../styles/palette";
import TextButton from "../../atoms/TextButton";

// type
interface SectionProps {
  title: string;
  subTitle?: string;
  button?: boolean;
  children: React.ReactNode;
}

// styled-components
const SectionContainer = styled.section`
  margin-bottom: 72px;

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
    margin-left: auto;
    margin-right: auto;
  }
`;

const SectionHeader = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;

  .textButton {
    @media screen and (max-width: 1024px) {
      display: none;
    }
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  margin-top: 12px;
  margin-bottom: 0px;
  color: ${palette.gray600};
`;

const Section: React.FC<SectionProps> = ({
  title,
  subTitle,
  button,
  children,
}) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <div>
          <Title>{title}</Title>
          {subTitle && <SubTitle>{subTitle}</SubTitle>}
        </div>
        {button && (
          <TextButton className="textButton" size="md">
            전체 클래스 보기
          </TextButton>
        )}
      </SectionHeader>
      {children}
    </SectionContainer>
  );
};

export default Section;
