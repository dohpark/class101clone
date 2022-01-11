import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Badge from "../../atoms/Badge";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import IconButton from "../../atoms/IconButton";
import Image from "../../atoms/Image";
import palette from "../../../styles/palette";

const getDTime = () => {
  const localTime = new Date();
  let year = localTime.getFullYear();
  let month = localTime.getMonth() + 1;
  let date = localTime.getDate() + 1;
  let hour = localTime.getHours();
  let minute = localTime.getMinutes();
  let second = localTime.getSeconds();

  const now: any = new Date(
    `${year}-${month}-${date} ${hour}:${minute}:${second}`
  );
  const dTime: any = new Date(`${year}-${month}-${date + 1} 00:00:00`);

  const gap = dTime - now;
  let dHour = Math.floor(
    (gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  ).toString();
  let dMinute = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60)).toString();
  let dSecond = Math.floor((gap % (1000 * 60)) / 1000).toString();

  const zeroAdder = (time: string) => {
    if (time.length === 1) return `0${time}`;
    else return time;
  };

  return [dHour, dMinute, dSecond].map((val) => zeroAdder(val));
};

const countDDay = (dDay: string) => {
  let [Dyear, Dmonth, Ddate] = dDay.split(/\.|-/);
  if (Dyear.length === 2) Dyear = `20${Dyear}`;

  const localTime = new Date();
  let year = localTime.getFullYear();
  let month = localTime.getMonth() + 1;
  let date = localTime.getDate() + 1;

  const now: any = new Date(`${year}-${month}-${date}`);
  const dTime: any = new Date(`${+Dyear}-${+Dmonth}-${+Ddate}`);

  const gap = dTime - now;
  if (gap === 0) return "D-Day";
  const daySecond = 24 * 60 * 60 * 1000;
  let result = gap / daySecond;
  return `${result}`;
};

const getDay = (yearMonthDate: string) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  let [year, month, date] = yearMonthDate.split(/\.|-/);

  const target = new Date(`20${year}-${month}-${date}`);
  const day = target.getDay();

  return `${month}.${date} (${days[day]})`;
};

const numberWithComma = (won: number) => {
  return won.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getTitleCSS = (
  type: "timeDeal" | "mdRecommend" | "openSoon" | "popularEvent"
) => {
  switch (type) {
    case "popularEvent":
      return css`
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: -0.15px;
        margin-top: 8px;
      `;
    default:
      return css`
        font-size: 14px;
        font-weight: normal;
        height: 40px;
        overflow: hidden;
      `;
  }
};

interface StyledTextContainer {
  type: "timeDeal" | "mdRecommend" | "openSoon" | "popularEvent";
}

const CardContainer = styled.div``;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 3px;

  .couponBadge {
    top: 3%;
    left: 3%;
    position: absolute;
    z-index: 1;
    width: 60px;
    border-radius: 3px;
    padding: 8px;
    text-align: center;
  }
  .likeIcon {
    top: 2%;
    right: 2%;
    position: absolute;
    z-index: 1;
    border-radius: 50%;
  }
`;

const TextContainer = styled.div<StyledTextContainer>`
  .timeDeal {
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
  }

  .creator {
    font-weight: 700;
    font-size: 0.8rem;
    line-height: 0.875rem;
    margin: 5px 0px;
  }

  .title {
    ${(props) => getTitleCSS(props.type)};
  }

  .icon {
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
  }

  .breakline {
    width: 100%;
    height: 1px;
    background-color: ${palette.gray100};
    margin: 8px 0;
  }

  .cheer {
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
  }

  .cheerButton {
    border-radius: 3px;
    height: 40px;
    font-size: 14px;
    font-weight: 500;
  }

  .price {
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
  }

  .period {
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
  }
`;

interface CardProps {
  type: "timeDeal" | "mdRecommend" | "openSoon" | "popularEvent";
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
  if (coupon === 0) coupon = null;
  if (like === 0) like = null;
  if (thumsUp === 0) thumsUp = null;

  let cheerRate: number | null;
  let dDay: string | null;
  let discountPercentage: number | null;
  let discountPerMonth: number | null;
  let discountPerMonthString: string | null;
  let periodDDay: string | null;
  let periodStartDate: string | null;
  let periodFinishDate: string | null;

  if (cheer) {
    cheerRate = Math.floor((cheer.score / cheer.goal) * 100);
    dDay = countDDay(cheer.finishDate);
  } else {
    cheerRate = null;
    dDay = null;
  }

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

  if (period) {
    periodDDay = countDDay(period.finishDate);
    periodStartDate = getDay(period.startDate);
    periodFinishDate = getDay(period.finishDate);
  } else {
    periodDDay = null;
    periodStartDate = null;
    periodFinishDate = null;
  }

  // 타임 딜 계산
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
      <TextContainer type={type}>
        {type === "timeDeal" && (
          <div className="timeDeal">
            <div>⏰ 타임딜 종료까지</div>
            <div className="leftTime">{timeLeft}</div>
          </div>
        )}
        {creator && <div className="creator">{creator}</div>}
        {type === "timeDeal" && <div className="title">[💣24시간] {title}</div>}
        {type !== "timeDeal" && <div className="title">{title}</div>}
        {(cheerRate || like || thumsUp) && (
          <div className="icon">
            {cheer && (
              <span className="cheerRate">
                <Icon fillColor={palette.red400} size={10} iconName="Bell" />
                &nbsp;&nbsp;
                {cheerRate}% 달성
              </span>
            )}
            {like && (
              <span className="likeCount">
                <Icon fillColor={palette.gray600} size={10} iconName="Heart" />{" "}
                {like}
              </span>
            )}
            {thumsUp && (
              <span className="thumsUpRate">
                <Icon fillColor={palette.gray600} size={10} iconName="Like" />{" "}
                {thumsUp}%
              </span>
            )}
          </div>
        )}
        {(cheerRate || like || thumsUp) && <div className="breakline"></div>}
        {cheer && (
          <div className="cheer">
            <span className="cheerUntil">응원마감까지</span>
            <span className="cheerDDay">{dDay}일 남음</span>
          </div>
        )}
        {price && (
          <div className="price">
            {discountPercentage !== 0 && (
              <span className="discountPercentage">{discountPercentage}% </span>
            )}
            <span className="discountPerMonth">
              월 {discountPerMonthString}원{" "}
            </span>
            {price.installment && (
              <span className="installment">({price.installment}개월)</span>
            )}
          </div>
        )}
        {period && period.startDate !== "0" && (
          <div className="period">
            <span className="dDay">D-{periodDDay}</span>
            <span className="fullPeriod">
              {periodStartDate} ~ {periodFinishDate}
            </span>
          </div>
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
    </CardContainer>
  );
};

export default Card;
