import React from "react";
import Image from "./components/atoms/Image";

function App() {
  return (
    <div className="App">
      <header className="App-header">Learn React</header>
      <Image
        src="https://cloudfour.com/examples/img-currentsrc/images/kitten-small.png"
        alt="dfdfdfd"
        expand={true}
      />
    </div>
  );
}

export default App;
