import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Badge from "../../atoms/Badge";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import IconButton from "../../atoms/IconButton";
import Image from "../../atoms/Image";
import palette from "../../../styles/palette";

// type
type CardType = "timeDeal" | "mdRecommend" | "openSoon" | "popularEvent";

interface CardProps {
  type: CardType;
  title: string;
  creator?: string;
  img: string;
  like?: number | null;
  thumsUp?: number | null;
  price?: {
    originalPrice: number;
    salePrice: number;
    installment: number;
  };
  cheer?: {
    goal: number;
    score: number;
    finishDate: string;
  };
  period?: {
    startDate: string;
    finishDate: string;
  };
  coupon?: number | null;
}

interface StyledTextTitle {
  type: CardType;
}

// function
const getDTime = () => {
  const localTime = new Date();
  let hour = localTime.getHours();
  let minute = localTime.getMinutes();
  let second = localTime.getSeconds();

  const now = new Date(`1997/3/10 ${hour}:${minute}:${second}`);
  const dTime = new Date(`1997/3/11 00:00:00`);

  const timeGap = dTime.valueOf() - now.valueOf();
  let dHour = Math.floor(
    (timeGap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  ).toString();
  let dMinute = Math.floor(
    (timeGap % (1000 * 60 * 60)) / (1000 * 60)
  ).toString();
  let dSecond = Math.floor((timeGap % (1000 * 60)) / 1000).toString();

  const zeroAdder = (time: string) => {
    if (time.length === 1) return `0${time}`;
    else return time;
  };

  return [dHour, dMinute, dSecond].map((val) => zeroAdder(val));
};

const countDDay = (DDay: string) => {
  let [Dyear, Dmonth, Ddate] = DDay.split(/\.|-/);
  if (Dyear.length === 2) Dyear = `20${Dyear}`;

  const localTime = new Date();
  const [year, month, date] = [
    localTime.getFullYear(),
    localTime.getMonth() + 1,
    localTime.getDate(),
  ];

  const today: Date = new Date(`${year}/${month}/${date}`);
  const dDay: Date = new Date(`${+Dyear}/${+Dmonth}/${+Ddate}`);

  return (dDay.valueOf() - today.valueOf()) / (24 * 60 * 60 * 1000);
};

const getDateAndDay = (yearMonthDate: string) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  let [year, month, date] = yearMonthDate.split(/\.|-/);

  const target = new Date(`20${year}-${month}-${date}`);
  const day = target.getDay();

  return `${month}.${date} (${days[day]})`;
};

const numberWithComma = (won: number) => {
  return won.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getTitleCSS = (type: CardType) => {
  switch (type) {
    case "popularEvent":
      return css`
        font-size: 14px;
        font-weight: 700;
        margin-top: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-height: 20px;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: keep-all;
      `;
    default:
      return css`
        height: 40px;
        line-height: 20px;
        font-size: 14px;
        font-weight: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: keep-all;
      `;
  }
};

// styled
const CardContainer = styled.div`
  a {
    text-decoration: none;
    color: ${palette.black};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 3px;

  .couponBadge {
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
  .likeIcon {
    top: 4px;
    right: 8px;
    position: absolute;
    z-index: 1;
    border-radius: 50%;

    @media screen and (max-width: 1024px) {
      top: 1px;
    }
  }
`;

const TextContainer = styled.div`
  .breakline {
    width: 100%;
    height: 1px;
    background-color: ${palette.gray100};
    margin: 8px 0;
  }

  .cheerButton {
    border-radius: 3px;
    height: 40px;
    font-size: 14px;
    font-weight: 500;
  }
`;

const TimeDealCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
  padding: 5px;
  border-radius: 3px;
  font-size: 9px;
  line-height: 12px;
  font-weight: 600;
  color: ${palette.white};
  background-color: ${palette.blue800};

  @media screen and (max-width: 640px) {
    letter-spacing: -0.5px;
  }
`;

const TextCreator = styled.div`
  font-weight: 700;
  font-size: 0.8rem;
  line-height: 0.875rem;
  margin: 8px 0px 5px;
`;

const TextTitle = styled.div<StyledTextTitle>`
  ${(props) => getTitleCSS(props.type)};
`;

const IconWrapper = styled.div`
  margin: 4px 0;
  font-size: 11px;

  .likeCount,
  .thumsUpRate {
    margin-right: 5px;
    color: ${palette.gray600};
  }

  .cheerRate {
    margin-right: 5px;
    color: ${palette.red500};
    font-weight: 700;
  }
`;

const CheerWrapper = styled.div`
  margin-bottom: 8px;

  .cheerUntil {
    font-size: 11px;
    font-weight: normal;
    line-height: 16px;
    color: ${palette.gray600};
    margin-right: 4px;
  }
  .cheerDDay {
    font-size: 11px;
    font-weight: normal;
    line-height: 16px;
    color: ${palette.black};
  }
`;

const PriceWrapper = styled.div`
  min-width: 168px;

  .discountPercentage {
    font-size: 0.8125rem;
    font-weight: 700;
    line-height: 1.125rem;
    color: ${palette.red400};
    margin-right: 2px;
  }
  .discountPerMonth {
    font-size: 0.8125rem;
    font-weight: 700;
    line-height: 1.125rem;
    margin-right: 2px;
  }
  .installment {
    font-size: 0.6875rem;
    font-weight: 400;
    line-height: 0.875rem;
    color: ${palette.gray600};
  }
`;

const PeriodWrapper = styled.div`
  .dDay {
    font-size: 0.6875rem;
    font-weight: 700;
    color: ${palette.red600};
    margin-right: 5px;
  }
  .fullPeriod {
    font-size: 0.6875rem;
    font-weight: normal;
    margin-right: 4px;
  }
`;

const Card: React.FC<CardProps> = ({
  type,
  title,
  creator,
  img,
  like,
  thumsUp,
  price,
  cheer,
  period,
  coupon,
}) => {
  let cheerRate: number | null;
  let cheerDDay: string | null;
  let dDay: number;
  let discountPercentage: number | null;
  let discountPerMonth: number | null;
  let discountPerMonthString: string | null;
  let periodDDay: string | null;
  let periodStartDate: string | null;
  let periodFinishDate: string | null;

  // 초기 값이 0인 경우 null
  if (coupon === 0) coupon = null;
  if (like === 0) like = null;
  if (thumsUp === 0) thumsUp = null;

  // cheerRate, cheerDDay
  if (cheer) {
    cheerRate = Math.floor((cheer.score / cheer.goal) * 100);
    dDay = countDDay(cheer.finishDate);
    if (dDay > 0) cheerDDay = `${dDay}일 남음`;
    else if (dDay === 0) cheerDDay = "오늘!!";
    else cheerDDay = `이미 지났어요ㅠ +${dDay}`;
  } else {
    cheerRate = null;
    cheerDDay = null;
  }

  // discountPercentage, discountPerMonth, discountPerMonthString
  if (price) {
    discountPercentage = Math.floor(
      ((price.originalPrice - price.salePrice) / price.originalPrice) * 100
    );
    discountPerMonth = price.salePrice / price.installment;
    discountPerMonthString = numberWithComma(discountPerMonth);
  } else {
    discountPercentage = null;
    discountPerMonth = null;
    discountPerMonthString = null;
  }

  // peridDDay, periodStartDate, periodFinishDate
  if (period) {
    dDay = countDDay(period.finishDate);
    if (dDay > 0) periodDDay = `D-${dDay}`;
    else if (dDay === 0) periodDDay = "D-Day!!";
    else periodDDay = `할인 이벤트 완료! +${dDay * -1}일`;

    periodStartDate = getDateAndDay(period.startDate);
    periodFinishDate = getDateAndDay(period.finishDate);
  } else {
    periodDDay = null;
    periodStartDate = null;
    periodFinishDate = null;
  }

  // Time Deal
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      let time = getDTime();
      setTimeLeft(`${time[0]}:${time[1]}:${time[2]}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <CardContainer>
      <a target="card" href="https://github.com/dohpark/class101clone">
        <ImageContainer>
          {coupon && (
            <Badge
              size="md"
              className="couponBadge"
              color={palette.white}
              backgroundColor={palette.red500}
            >
              {coupon}만원 쿠폰
            </Badge>
          )}
          {like && (
            <IconButton
              className="likeIcon"
              iconName="HeartOutline"
              fillColor={palette.white}
              size="sm"
            />
          )}
          <Image src={img} alt={title} expand={true} />
        </ImageContainer>
        <TextContainer>
          {type === "timeDeal" && (
            <TimeDealCount>
              <div>⏰ 타임딜 종료까지</div>
              <div>{timeLeft}</div>
            </TimeDealCount>
          )}
          {creator && <TextCreator>{creator}</TextCreator>}
          {type === "timeDeal" && (
            <TextTitle type={type}>[💣24시간] {title}</TextTitle>
          )}
          {type !== "timeDeal" && <TextTitle type={type}>{title}</TextTitle>}
          {(cheerRate || like || thumsUp) && (
            <IconWrapper>
              {cheer && (
                <span className="cheerRate">
                  <Icon fillColor={palette.red400} size={10} iconName="Bell" />
                  &nbsp;&nbsp;
                  {cheerRate}% 달성
                </span>
              )}
              {like && (
                <span className="likeCount">
                  <Icon
                    fillColor={palette.gray600}
                    size={10}
                    iconName="Heart"
                  />{" "}
                  {like}
                </span>
              )}
              {thumsUp && (
                <span className="thumsUpRate">
                  <Icon fillColor={palette.gray600} size={10} iconName="Like" />{" "}
                  {thumsUp}%
                </span>
              )}
            </IconWrapper>
          )}
          {(cheerRate || like || thumsUp) && <div className="breakline"></div>}
          {cheer && (
            <CheerWrapper>
              <span className="cheerUntil">응원마감까지</span>
              <span className="cheerDDay">{cheerDDay}</span>
            </CheerWrapper>
          )}
          {price && (
            <PriceWrapper>
              {discountPercentage !== 0 && (
                <span className="discountPercentage">
                  {discountPercentage}%{" "}
                </span>
              )}
              {price.salePrice >= 1000 && (
                <span className="discountPerMonth">
                  월 {discountPerMonthString}원{" "}
                </span>
              )}
              {price.installment && price.salePrice >= 1000 && (
                <span className="installment">({price.installment}개월)</span>
              )}
              {price.salePrice < 1000 && (
                <span className="discountPerMonth">{price.salePrice}원 </span>
              )}
            </PriceWrapper>
          )}
          {period && period.startDate !== "0" && (
            <PeriodWrapper>
              <span className="dDay">{periodDDay}</span>
              <span className="fullPeriod">
                {periodStartDate} ~ {periodFinishDate}
              </span>
            </PeriodWrapper>
          )}
          {type === "openSoon" && (
            <Button
              backgroundColor="orangeLight"
              color="orange"
              className="cheerButton"
            >
              응원하기
            </Button>
          )}
        </TextContainer>
      </a>
    </CardContainer>
  );
};

export default Card;
