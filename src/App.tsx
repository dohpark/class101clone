import styled from "styled-components";
import Card from "./components/molecules/Card";
import {
  timeDeal,
  popularEvent,
  mdRecommend,
  openSoon,
  topEvent,
  bottomEvent,
} from "./data/data";
import Section from "./components/organisms/Section";
import Header from "./components/organisms/Header";
import Nav from "./components/organisms/Nav";
import Banner from "./components/molecules/Banner";
import BottomNav from "./components/organisms/BottomNav";
import CarouselBanner from "./components/organisms/CarouselBanner";
import CarouselCard from "./components/organisms/CarouselCard";
import TopBanner from "./components/organisms/TopBanner";

const HomePage = styled.div``;

const BannerContainer = styled.div`
  margin-bottom: 72px;
`;

function App() {
  return (
    <HomePage>
      <Header />
      <Nav />
      <TopBanner array={topEvent.top_event} />
      <Section title={"오늘의 특가! TIME DEAL"} button={true}>
        <CarouselCard slidesPerView={4} mobileSlidesPerView={2}>
          {timeDeal.time_deal.map(
            ({ id, title, creator, img, like, thumsUp, price, coupon }) => (
              <Card
                type="timeDeal"
                key={id}
                title={title}
                creator={creator}
                img={img}
                like={like}
                thumsUp={thumsUp}
                price={price}
                coupon={coupon}
              />
            )
          )}
        </CarouselCard>
      </Section>
      <Section title={"MD 추천 클래스"}>
        <CarouselCard slidesPerView={4} mobileSlidesPerView={2}>
          {mdRecommend.md_recommend.map(
            ({ id, title, creator, img, like, thumsUp, price, coupon }) => (
              <Card
                type="mdRecommend"
                key={id}
                title={title}
                creator={creator}
                img={img}
                like={like}
                thumsUp={thumsUp}
                price={price}
                coupon={coupon}
              />
            )
          )}
        </CarouselCard>
      </Section>
      <BannerContainer>
        <CarouselBanner slidesPerView={1} mobileSlidesPerView={1}>
          {bottomEvent.bottom_event.map(
            ({ id, title, subtitle, img, bgColor }) => (
              <Banner
                key={id}
                title={title}
                subtitle={subtitle}
                img={img}
                bgColor={bgColor}
              />
            )
          )}
        </CarouselBanner>
      </BannerContainer>
      <Section
        title={"오픈 예정 클래스"}
        subTitle={"오픈 예정인 클래스를 응원하면 얼리버드 오픈 시 알려드려요!"}
        button={true}
      >
        <CarouselCard slidesPerView={4} mobileSlidesPerView={2}>
          {openSoon.open_soon.map(({ id, title, creator, img, cheer }) => (
            <Card
              type="openSoon"
              key={id}
              title={title}
              creator={creator}
              img={img}
              cheer={cheer}
            />
          ))}
        </CarouselCard>
      </Section>
      <Section
        title={"인기있는 신규 클래스"}
        subTitle={"얼리버드 기간에만 받을 수 있는 최저가 할인 중이에요"}
        button={true}
      >
        <CarouselCard slidesPerView={3} mobileSlidesPerView={1}>
          {popularEvent.popular_event.map(({ id, title, img, period }) => (
            <Card
              type="popularEvent"
              key={id}
              title={title}
              img={img}
              period={period}
            />
          ))}
        </CarouselCard>
      </Section>
      <BottomNav />
    </HomePage>
  );
}

export default App;
