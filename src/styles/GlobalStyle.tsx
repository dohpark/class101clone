import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  font-family:'Noto Sans KR','Apple SD Gothic Neo', Sans-serif;
`;

export default GlobalStyle;
