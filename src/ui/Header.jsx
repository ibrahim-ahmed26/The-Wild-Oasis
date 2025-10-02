import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 3rem 5rem;
  border-bottom: 1px solid var(--color-grey-200);
  text-align: center;
`;
export default function Header() {
  return <StyledHeader>Header</StyledHeader>;
}
