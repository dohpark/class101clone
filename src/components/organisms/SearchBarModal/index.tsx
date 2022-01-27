import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import SearchBar from "../../molecules/SearchBar";
import { recommendSearch, popularSearchTerm } from "../../../data/data";
import TextButton from "../../atoms/TextButton";
import IconButton from "../../atoms/IconButton";

// type
interface SearchBarModalProps {
  closeModal: () => void;
}

// function
const getHour = () => {
  const localTime = new Date();
  let hour = localTime.getHours().toString();

  if (hour.length === 1) {
    return "0" + hour;
  }

  return hour;
};

// styled-components
const SearchModalContainer = styled.div`
  width: 100%;
  background-color: ${palette.white};
  overflow-y: scroll;

  @media screen and (max-width: 1024px) {
    height: 100vh;
  }

  @media screen and (min-width: 1024px) {
    height: 75vh;
  }
`;

const HeaderWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: left;

  @media screen and (max-width: 1024px) {
    padding: 0;
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

const LogoWrapper = styled.div`
  position: absolute;
  font-size: 1.5rem;
  font-weight: 800;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  width: 676px;
  margin: auto;

  @media screen and (max-width: 1024px) {
    width: 90%;
    padding: 8px 0px 0px 20px;
  }

  .closeModal {
    padding: initial;
    width: 40px;
    font-size: 14px;
    color: ${palette.gray600};

    @media screen and (max-width: 1024px) {
      padding: 0;
    }
  }
`;

const RecPopSearchWrapper = styled.div`
  width: 676px;
  margin: auto;
  padding: 4px 0 28px;

  @media screen and (max-width: 1024px) {
    width: calc(100% - 24px);
    padding: 24px 0px 28px 24px;
    margin: 0;
  }
`;

const RecentSearchBox = styled.div`
  position: relative;
  margin-bottom: 50px;
`;

const RecentSearchItem = styled.div`
  padding: 8px 0;
  border-radius: 0 0 3px 3px;
  position: relative;

  .closeButton {
    position: absolute;
    right: 0;
    height: 10px;
    width: 10px;
    top: 7px;
    right: 0px;

    @media screen and (max-width: 1024px) {
      position: absolute;
      right: 35px;
    }
  }
`;

const RecentSearchTerm = styled.div`
  font-size: 14px;
  font-weight: 400;

  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
`;

const SearchTitle = styled.h3`
  font-size: 14px;
  display: flex;
  align-items: center;
  font-weight: bold;
  flex: 1 1 0%;
  position: relative;

  .timeStandard {
    font-size: 11px;
    font-weight: 400;
    color: ${palette.gray700};

    @media screen and (max-width: 1024px) {
      position: absolute;
      right: 35px;
    }
  }

  .clearAllButton {
    position: absolute;
    top: 0;
    right: 0px;

    @media screen and (max-width: 1024px) {
      position: absolute;
      right: 35px;
    }
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

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
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

const SearchBarModal: React.FC<SearchBarModalProps> = ({ closeModal }) => {
  // localstorage
  const recommendSearchLength = recommendSearch.recommend_search.length;
  let refs: React.MutableRefObject<React.RefObject<HTMLButtonElement>[]> =
    useRef([...new Array(recommendSearchLength)].map(() => React.createRef()));

  const [searchedWords, setSearchedWords] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("searchedWords", JSON.stringify(searchedWords));
  }, [searchedWords]);

  const saveData = (index: number) => {
    const newSearchedWord = refs.current[index].current?.textContent;
    if (newSearchedWord) {
      if (!searchedWords.includes(newSearchedWord))
        setSearchedWords([newSearchedWord, ...searchedWords]);
    }
  };

  const removeData = (filterword: string) => {
    const filterWords = searchedWords.filter((word) => {
      return word !== filterword;
    });
    setSearchedWords(filterWords);
  };

  const clearAllData = () => {
    setSearchedWords([]);
  };

  // time standard
  const [time, setTime] = useState(`${getHour()}:00`);

  useEffect(() => {
    const id = setInterval(() => {
      let time = getHour();
      setTime(`${time}:00`);
    }, 60 * 1000 * 10);
    return () => clearInterval(id);
  }, [time]);

  // popularSearchItem 1~10
  const firstToFifth = popularSearchTerm.popular_search_term.slice(0, 5);
  const sixthToTenth = popularSearchTerm.popular_search_term.slice(5);

  return (
    <SearchModalContainer>
      <HeaderWrapper>
        <LogoWrapper>CLASS102</LogoWrapper>
        <SearchBarWrapper>
          <SearchBar placeholder="찾으시는 취미가 있으신가요?" modal={false} />
          <Button className="closeModal" onClick={closeModal}>
            취소
          </Button>
        </SearchBarWrapper>
      </HeaderWrapper>

      <RecPopSearchWrapper>
        {searchedWords[0] && (
          <RecentSearchBox>
            <SearchTitle>
              최근 검색어
              <TextButton
                className="clearAllButton"
                onClick={() => clearAllData()}
              >
                전체 삭제
              </TextButton>
            </SearchTitle>

            <RecentSearchItem>
              {searchedWords.map((value, index) => (
                <RecentSearchItem key={value}>
                  <IconButton
                    className="closeButton"
                    iconName="Close"
                    fillColor={palette.gray500}
                    onClick={() => removeData(value)}
                  />
                  <RecentSearchTerm>{value}</RecentSearchTerm>
                </RecentSearchItem>
              ))}
            </RecentSearchItem>
          </RecentSearchBox>
        )}

        <SearchTitle>추천 검색어</SearchTitle>
        <RecommendSearchBox>
          {recommendSearch.recommend_search.map((value, index) => (
            <button
              className={"recommendButton"}
              key={value}
              ref={refs.current[index]}
              onClick={() => saveData(index)}
            >
              {value}
            </button>
          ))}
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
            {firstToFifth.map((value, index) => (
              <PopularSearachItem key={value}>
                <CandidateRanking>{index + 1}</CandidateRanking>
                <CandidateName>{value}</CandidateName>
              </PopularSearachItem>
            ))}
          </PopularSearchKeyList>
          <PopularSearchKeyList>
            {sixthToTenth.map((value, index) => (
              <PopularSearachItem key={value}>
                <CandidateRanking>{index + 6}</CandidateRanking>
                <CandidateName>{value}</CandidateName>
              </PopularSearachItem>
            ))}
          </PopularSearchKeyList>
        </PopularSearchBox>
      </RecPopSearchWrapper>
    </SearchModalContainer>
  );
};

export default SearchBarModal;
