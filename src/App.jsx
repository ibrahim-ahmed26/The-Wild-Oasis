import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import BUTTON from "./ui/Button";
import INPUT from "./ui/Input";
export default function App() {
  const H1 = styled.h1`
    font-size: 1.4rem;
    font-weight: 600px;
    background-color: black;
    color: white;
    text-align: center;
  `;
  const MainDiv = styled.div`
    background-color: var(--color-grey-400);
    padding: 20px;
  `;

  return (
    <>
      <GlobalStyles />
      <MainDiv>
        <H1>The wild oasis</H1>
        <BUTTON onClick={() => alert("Check In")}>check in </BUTTON>
        <BUTTON onClick={() => alert("Check out")}>check out </BUTTON>
        <INPUT placeholder="number of guests" />
        <INPUT placeholder="number of guests" />
      </MainDiv>
    </>
  );
}
