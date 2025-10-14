import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 3rem 5rem;
  border-bottom: 1px solid var(--color-grey-200);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;
export default function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}
