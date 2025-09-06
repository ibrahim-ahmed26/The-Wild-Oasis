import styled, { css } from "styled-components";

const ROW = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      align-items: center;
      gap: 4px;
    `}
`;
ROW.defaultProps = {
  type: "vertical",
};
export default ROW;
