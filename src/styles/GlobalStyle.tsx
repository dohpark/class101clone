import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;
