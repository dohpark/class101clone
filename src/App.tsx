import Card from "./components/molecules/Card";
import Carousel from "./components/molecules/Carousel";
import { timeDeal, popularEvent, mdRecommend, openSoon } from "./data/data";
import Section from "./components/organisms/Section";
import Header from "./components/organisms/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Section title={"오늘의 특가! TIME DEAL"} button={true}>
        <Carousel slidesView={4} navPosition="eachSide" iconColor="black">
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
        </Carousel>
      </Section>
      <Section title={"MD 추천 클래스"}>
        <Carousel slidesView={4} navPosition="eachSide" iconColor="black">
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
        </Carousel>
      </Section>
      <Section
        title={"오픈 예정 클래스"}
        subTitle={"오픈 예정인 클래스를 응원하면 얼리버드 오픈 시 알려드려요!"}
        button={true}
      >
        <Carousel slidesView={4} navPosition="eachSide" iconColor="black">
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
        </Carousel>
      </Section>
      <Section
        title={"인기있는 신규 클래스"}
        subTitle={"얼리버드 기간에만 받을 수 있는 최저가 할인 중이에요"}
        button={true}
      >
        <Carousel slidesView={3} navPosition="eachSide" iconColor="black">
          {popularEvent.popular_event.map(({ id, title, img, period }) => (
            <Card
              type="popularEvent"
              key={id}
              title={title}
              img={img}
              period={period}
            />
          ))}
        </Carousel>
      </Section>
    </div>
  );
}

export default App;
