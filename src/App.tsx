import Button from "./components/atoms/Button";
import Icon from "./components/atoms/Icon";
import IconButton from "./components/atoms/IconButton";
import palette from "./styles/palette";

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
    </div>
  );
}

export default App;
