import styled from "styled-components";

const ScreenWarning = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
    padding: 2rem;
    background-color: var(--color-grey-100);
    color: var(--color-grey-700);
    font-size: 1.6rem;
    font-weight: 500;
  }
`;

export default function ScreenSizeNotice() {
  return (
    <ScreenWarning>
      <p>
        📊 The Wild Oasis Dashboard is best viewed on a laptop or desktop
        screen.
        <br /> Please switch to a larger device for the best experience.
      </p>
    </ScreenWarning>
  );
}
