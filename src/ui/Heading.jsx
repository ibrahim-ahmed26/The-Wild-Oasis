import styled, { css } from "styled-components";

const HEADING = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 5rem;
      font-weight: bolder;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 4rem;
      font-weight: bold;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  text-transform: capitalize;
  line-height: 1.4;
  padding-top: 5px;
  margin: 5px 0px;
`;
export default HEADING;
