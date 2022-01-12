import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import palette from "../../../styles/palette";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import SearchBar from "../../molecules/SearchBar";

const modalRoot = document.getElementById("modal-root") as HTMLElement;

const getHour = () => {
  const localTime = new Date();
  let hour = localTime.getHours().toString();

  if (hour.length === 1) {
    return "0" + hour;
  }

  return hour;
};

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  margin: 8px 0px;
`;

const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
`;

const SearchModalContainer = styled.div`
  width: 100%;
  background-color: ${palette.white};
`;

const HeaderWrapper = styled.div`
  max-width: 1176px;
  width: 100%;
  padding: 20px 0;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const LogoWrapper = styled.div`
  position: absolute;
  font-size: 1.5rem;
  font-weight: 800;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  width: 676px;
  margin: auto;

  .closeModal {
    padding: initial;
    width: 40px;
    font-size: 14px;
    color: ${palette.gray600};
  }
`;

const RecPopSearchWrapper = styled.div`
  width: 676px;
  margin: auto;
  padding: 4px 0 28px;
`;

const SearchTitle = styled.h3`
  font-size: 14px;
  display: flex;
  align-items: center;
  font-weight: bold;
  flex: 1 1 0%;

  .timeStandard {
    font-size: 11px;
    font-weight: 400;
    color: ${palette.gray700};
  }
`;
const RecommendSearchBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 8px;
  margin-bottom: 50px;

  .recommendButton {
    border: 0px;
    border-radius: 25px;
    margin: 8px 4px 0px 0px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    background-color: ${palette.gray100};
    width: initial;
  }
`;

const PopularSearchBox = styled.div`
  display: flex;
`;

const PopularSearchKeyList = styled.div`
  width: 50%;
`;

const PopularSearachItem = styled.div`
  font-size: 14px;
  padding: 8px 0;
  border-radius: 0 0 3px 3px;
`;

const CandidateRanking = styled.span`
  display: inline-block;
  width: 20px;
  margin-right: 8px;
  font-weight: bold;
  color: ${palette.orange400};
`;

const CandidateName = styled.span`
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

interface fast {
  isOpen: boolean;
  closeModal: () => void;
}

const SearchBarModal: React.FC<fast> = ({ isOpen, closeModal, children }) => {
  const [time, setTime] = useState(`${getHour()}:00`);

  useEffect(() => {
    const id = setInterval(() => {
      let time = getHour();
      console.log(time);
      setTime(`${time}:00`);
    }, 60 * 1000);
    return () => clearInterval(id);
  }, [time]);

  if (!isOpen) return null;

  return createPortal(
    <ModalContainer>
      <SearchModalContainer>
        <HeaderWrapper>
          <LogoWrapper>CLASS102</LogoWrapper>
          <SearchBarWrapper>
            <SearchBar
              placeholder="찾으시는 취미가 있으신가요?"
              modal={false}
            />
            <Button className="closeModal" onClick={closeModal}>
              취소
            </Button>
          </SearchBarWrapper>
        </HeaderWrapper>

        <RecPopSearchWrapper>
          <SearchTitle>추천 검색어</SearchTitle>
          <RecommendSearchBox>
            <Button className={"recommendButton"}>오늘의 특가</Button>
            <Button className={"recommendButton"}>새해 인기취미</Button>
            <Button className={"recommendButton"}>태블릿최저가</Button>
            <Button className={"recommendButton"}>새해 인기 클래스</Button>
            <Button className={"recommendButton"}>재테크 시작</Button>
            <Button className={"recommendButton"}>N잡러 준비</Button>
            <Button className={"recommendButton"}>일잘러의 비법</Button>
            <Button className={"recommendButton"}>요즘 외국어 공부</Button>
          </RecommendSearchBox>

          <SearchTitle>
            인기검색어 &nbsp;
            <span className="timeStandard">
              <Icon iconName="Clock" size={11} fillColor={palette.gray700} />
              &nbsp;
              {time} 기준
            </span>
          </SearchTitle>
          <PopularSearchBox>
            <PopularSearchKeyList>
              <PopularSearachItem>
                <CandidateRanking>1</CandidateRanking>
                <CandidateName>아이패드</CandidateName>
              </PopularSearachItem>
              <PopularSearachItem>
                <CandidateRanking>2</CandidateRanking>
                <CandidateName>이모티콘</CandidateName>
              </PopularSearachItem>
              <PopularSearachItem>
                <CandidateRanking>3</CandidateRanking>
                <CandidateName>일러스트</CandidateName>
              </PopularSearachItem>
              <PopularSearachItem>
                <CandidateRanking>4</CandidateRanking>
                <CandidateName>베이킹</CandidateName>
              </PopularSearachItem>
              <PopularSearachItem>
                <CandidateRanking>5</CandidateRanking>
                <CandidateName>포토샵</CandidateName>
              </PopularSearachItem>
            </PopularSearchKeyList>
            <PopularSearchKeyList>
              <PopularSearachItem>
                <CandidateRanking>6</CandidateRanking>
                <CandidateName>드로잉</CandidateName>
              </PopularSearachItem>
              <PopularSearachItem>
                <CandidateRanking>7</CandidateRanking>
                <CandidateName>그림</CandidateName>
              </PopularSearachItem>
              <PopularSearachItem>
                <CandidateRanking>8</CandidateRanking>
                <CandidateName>가죽공예</CandidateName>
              </PopularSearachItem>
              <PopularSearachItem>
                <CandidateRanking>9</CandidateRanking>
                <CandidateName>주식</CandidateName>
              </PopularSearachItem>
              <PopularSearachItem>
                <CandidateRanking>10</CandidateRanking>
                <CandidateName>자수</CandidateName>
              </PopularSearachItem>
            </PopularSearchKeyList>
          </PopularSearchBox>
        </RecPopSearchWrapper>
      </SearchModalContainer>
      <ModalBackground onClick={closeModal} />
    </ModalContainer>,
    modalRoot
  );
};

export default SearchBarModal;
