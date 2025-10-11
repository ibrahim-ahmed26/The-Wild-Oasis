import styled, { css } from "styled-components";

const baseStyles = css`
  overflow: hidden;
  font-size: 1.4rem;
  width: 80rem;
`;

const regularStyles = css`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
`;

const modalStyles = css`
  padding: 0;
`;

const Form = styled.form`
  ${baseStyles}
  ${(props) => (props.type === "modal" ? modalStyles : regularStyles)}
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
