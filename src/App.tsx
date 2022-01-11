import styled from "styled-components";
import Button from "./components/atoms/Button";
import Icon from "./components/atoms/Icon";
import IconButton from "./components/atoms/IconButton";
import Card from "./components/molecules/Card";
import Carousel from "./components/molecules/Carousel";
import palette from "./styles/palette";
import { timeDeal, popularEvent, mdRecommend, openSoon } from "./data/data";

const Slide = styled.div`
  width: 100%;
  height: 300px;
  background-color: brown;
`;

function App() {
  return (
    <div className="App">
      <Icon size={100} iconName={"Heart"} />
      <Button>help</Button>
      <IconButton
        iconName={"Like"}
        fillColor={palette.orange400}
        backgroundColor="transparent"
      />
      <IconButton
        iconName={"LikeOutline"}
        fillColor={palette.orange400}
        backgroundColor="transparent"
      />
      <Carousel slidesView={3} navPosition="rightIn" iconColor="white">
        {[1, 2, 3, 4, 5].map((order) => (
          <Slide key={order} />
        ))}
      </Carousel>
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
    </div>
  );
}

export default App;
