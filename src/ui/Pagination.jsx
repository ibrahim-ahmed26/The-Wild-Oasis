import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constrains";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;
  text-transform: capitalize;
  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);
  function handleInc() {
    if (currentPage < pageCount) {
      searchParams.set("page", currentPage + 1);
      setSearchParams(searchParams);
    }
  }
  function handleDec() {
    if (currentPage > 1) {
      searchParams.set("page", currentPage - 1);
      setSearchParams(searchParams);
    }
  }
  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span>–
        <span>{Math.min(currentPage * PAGE_SIZE, count)}</span> of{" "}
        <span>{count}</span> results
      </P>

      <Buttons>
        <PaginationButton onClick={handleDec} disabled={currentPage === 1}>
          <span>
            <FaChevronLeft />
          </span>
          perv
        </PaginationButton>

        <PaginationButton
          onClick={handleInc}
          disabled={currentPage === pageCount}
        >
          next
          <span>
            <FaChevronRight />
          </span>
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}
