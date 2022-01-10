import styled from "styled-components";
import Button from "./components/atoms/Button";
import Icon from "./components/atoms/Icon";
import IconButton from "./components/atoms/IconButton";
import Carousel from "./components/molecules/Carousel";
import palette from "./styles/palette";

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
      <Carousel slidesView={2} navPosition="eachSide" iconColor="black">
        {[1, 2, 3, 4, 5].map((order) => (
          <Slide key={order} />
        ))}
      </Carousel>
    </div>
  );
}

export default App;
