import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSideBar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 2rem 4rem;
  border-right: 1px solid var(--color-grey-200);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export default function Sidebar() {
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />
    </StyledSideBar>
  );
}
