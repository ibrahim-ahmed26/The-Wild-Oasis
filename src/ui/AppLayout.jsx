import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./SideBar";
import styled from "styled-components";
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 265px 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const Main = styled.main`
  background-color: var(--color-grey-0);
  padding: 2rem 3rem;
`;
export default function AppLayout() {
  return (
    <GridContainer>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </GridContainer>
  );
}
