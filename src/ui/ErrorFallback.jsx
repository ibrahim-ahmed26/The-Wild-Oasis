import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import BUTTON from "./Button";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
export default function ErrorFallback({ error }) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <h1>Something went wrong 😥</h1>
          <p>{error?.message || "An unexpected error occurred."}</p>
          <StyledDiv>
            <BUTTON
              variations="secondary"
              sizes="medium"
              onClick={() => window.location.reload()}
            >
              Try Again
            </BUTTON>
          </StyledDiv>
        </Box>
      </StyledErrorFallback>
    </>
  );
}
