import styled, { css } from "styled-components";

const baseRowStyles = css`
  display: grid;
  align-items: flex-end;
  grid-template-columns: 20rem 1fr auto;
  gap: 2rem;
  padding: 1.6rem 0;
  position: relative;
  transition: background-color 0.25s ease, transform 0.2s ease;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-200);
  }

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

const buttonRowStyles = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.6rem;
  border-bottom: none;
  padding-top: 2rem;
`;

const StyledFormRow = styled.div`
  ${baseRowStyles}
  ${(props) => props.$hasButton && buttonRowStyles}
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--color-grey-800);
  letter-spacing: 0.2px;
  transition: color 0.3s ease;

  ${StyledFormRow}:hover & {
    color: var(--color-brand-600);
  }
`;

const Error = styled.span`
  font-size: 1.3rem;
  color: var(--color-red-700);
  background-color: rgba(255, 0, 0, 0.06);
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: end;
  transition: all 0.25s ease;
  box-shadow: 0 0 0 1px rgba(255, 0, 0, 0.1);
`;

export default function FormRow({ children, label, errors }) {
  const hasButton =
    children?.type === "button" ||
    children?.props?.type === "submit" ||
    children?.type?.displayName === "Button";

  return (
    <StyledFormRow $hasButton={hasButton}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {errors && <Error>{errors}</Error>}
    </StyledFormRow>
  );
}
