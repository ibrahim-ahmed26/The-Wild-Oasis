import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router";
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;
export default function ProtectedRoutes({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/login", { replace: true });
  }, [isAuthenticated, isLoading, navigate]);
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }
  if (isAuthenticated) return children;
  return null;
}
