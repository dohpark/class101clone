import styled from "styled-components";
import palette from "../../../styles/palette";
import TextButton from "../../atoms/TextButton";

const SectionContainer = styled.div`
  margin-top: 72px;
  max-width: 1176px;
  margin-left: auto;
  margin-right: auto;
`;

const Header = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 0px;
  color: ${palette.gray600};
`;

interface SectionProps {
  title: string;
  subTitle?: string;
  button?: boolean;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  title,
  subTitle,
  button,
  children,
}) => {
  return (
    <SectionContainer>
      <Header>
        <div>
          <Title>{title}</Title>
          {subTitle && <SubTitle>{subTitle}</SubTitle>}
        </div>
        {button && <TextButton size="md">전체 클래스 보기</TextButton>}
      </Header>
      {children}
    </SectionContainer>
  );
};

export default Section;
