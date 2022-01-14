import { useRef } from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import Icon from "../../atoms/Icon";
import TextButton from "../../atoms/TextButton";

const NavContainer = styled.nav`
  display: flex;
  max-width: 1176px;
  margin-left: auto;
  margin-right: auto;

  .tb {
    margin-right: 32px;
    padding: 8px 0px 20px;
    line-height: 24px;
  }

  .tb:hover {
    font-weight: 600;
    text-underline-offset: 10px;
    text-decoration-thickness: 2px;
    filter: brightness(100%);
  }

  .wall {
    padding: 8px 0px 20px;
    line-height: 24px;
    font-size: 33px;
    font-weight: 100;
    color: ${palette.gray200};
  }

  .lb {
    margin-left: 28px;
    margin-right: 0;
    font-weight: 400;
  }

  // nav

  .category {
    position: relative;
    height: 100%;
    z-index: 2;
  }

  ul {
    position: absolute;
    background-color: white;
    padding: 0 15px 20px 15px;
    list-style-type: none;
    border: 0.5px solid ${palette.gray200};
    width: 180px;
    height: 740px;
  }

  .firstUl {
    visibility: hidden;
  }

  .category:hover ul {
    visibility: visible;
  }

  .secondUl {
    display: none;
  }

  .firstUl li:hover .secondUl {
    display: block;
  }

  .category ul li {
    text-align: left;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    padding: 4px 15px;
    margin: 0;
  }

  li:hover {
    background-color: ${palette.gray100};
  }

  .category ul .categoryTitle {
    padding-top: 15px;
    font-size: 11px;
    color: ${palette.gray600};
    background-color: 
    font-weight: 600;
    padding-bottom: 0px;
    cursor: auto;
  }

  .category ul .categoryTitle {
    background-color: transparent;
  }

  .category ul li ul {
    position: absolute;
    left: 210px;
    top: -1px;
  }
`;

const Nav: React.FC = () => {
  const firstUL = useRef<HTMLUListElement>(null);
  const onMouseEnter = () => {
    const { current } = firstUL;
    if (current != null) {
      current.style.width = `391px`;
      console.log("hello");
    }
  };
  const onMouseLeave = () => {
    const { current } = firstUL;
    if (current != null) {
      current.style.width = `180px`;
      console.log("hello");
    }
  };

  return (
    <NavContainer>
      <TextButton size="lg" color="black" className="tb category">
        전체 카테고리 &nbsp;
        <Icon fillColor={palette.black} iconName="Menu" size={12} />
        <ul className="firstUl" ref={firstUL}>
          <li className="categoryTitle">크리에이티브</li>
          <li
            onMouseEnter={() => onMouseEnter()}
            onMouseLeave={() => onMouseLeave()}
          >
            디지털드로잉
            <ul className="secondUl">
              <li className="categoryTitle">디지털 드로잉</li>
              <li>일러스트</li>
              <li>컨셉아트</li>
              <li>캐릭터 드로잉</li>
              <li>인물 드로잉</li>
              <li>굿즈 · 이모티콘</li>
              <li>웹툰</li>
              <li>캘리그라피</li>
              <li>더 새로운 디지털 드로잉</li>
            </ul>
          </li>
          <li
            onMouseEnter={() => onMouseEnter()}
            onMouseLeave={() => onMouseLeave()}
          >
            드로잉
            <ul className="secondUl">
              <li className="categoryTitle">드로잉</li>
              <li>펜 · 연필</li>
              <li>마카</li>
              <li>색연필</li>
              <li>수채화</li>
              <li>오일파스텔</li>
              <li>과슈 · 아크릴화</li>
              <li>유화</li>
              <li>동양화</li>
              <li>캘리그라피</li>
              <li>더 새로운 드로잉</li>
            </ul>
          </li>
          <li
            onMouseEnter={() => onMouseEnter()}
            onMouseLeave={() => onMouseLeave()}
          >
            공예
            <ul className="secondUl">
              <li className="categoryTitle">공예</li>
              <li>대바늘 뜨게</li>
              <li>코바늘 뜨개</li>
              <li>자수</li>
              <li>실 공예</li>
              <li>패브릭 공예</li>
              <li>비누 · 캔들 · 향</li>
              <li>나무 · 라탄 공예</li>
              <li>가죽 공예</li>
              <li>종이 공예</li>
              <li>레진 공예</li>
              <li>도예</li>
              <li>플라워 공예</li>
              <li>더 새로운 공예</li>
            </ul>
          </li>
          <li
            onMouseEnter={() => onMouseEnter()}
            onMouseLeave={() => onMouseLeave()}
          >
            요리 · 음료
            <ul className="secondUl">
              <li className="categoryTitle">요리 · 음료</li>
              <li>한식</li>
              <li>일식 · 중식</li>
              <li>양식</li>
              <li>세계 요리</li>
              <li>건강 · 다이어트식</li>
              <li>비건 · 채소</li>
              <li>도시락 · 케이터링</li>
              <li>음료 · 술</li>
              <li> 더 새로운 요리 · 음료</li>
            </ul>
          </li>
          <li>베이킹 · 디저트</li>
          <li>음악</li>
          <li>운동</li>
          <li>라이프</li>
          <li>사진 · 영상</li>
          <li className="categoryTitle">수익창출</li>
          <li>금융 · 재테크</li>
          <li>창업 · 부업</li>
          <li>성공마인드</li>
          <li className="categoryTitle">커리어</li>
          <li>디자인</li>
          <li>개발 · 데이터</li>
          <li>직무교육</li>
          <li>글쓰기</li>
          <li>언어 · 외국어</li>
          <li className="categoryTitle">키즈</li>
          <li>아동 교육</li>
        </ul>
      </TextButton>
      <TextButton size="lg" color="black" className="tb">
        1월 가입혜택
      </TextButton>
      <TextButton size="lg" color="black" className="tb">
        이벤트
      </TextButton>
      <TextButton size="lg" color="black" className="tb">
        바로수강
      </TextButton>
      <TextButton size="lg" color="black" className="tb">
        신규 클래스
      </TextButton>
      <TextButton size="lg" color="black" className="tb">
        오픈 예정
      </TextButton>

      <div className="wall">|</div>

      <TextButton size="lg" color="black" className="tb lb">
        시그니처
      </TextButton>
      <TextButton size="lg" color="black" className="tb lb">
        키즈
      </TextButton>
      <TextButton size="lg" color="black" className="tb lb">
        원포인트 클래스
      </TextButton>
    </NavContainer>
  );
};

export default Nav;
