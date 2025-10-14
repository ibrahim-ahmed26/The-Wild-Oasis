import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router";
import Logout from "../features/authentication/Logout";
import DarkModeToogle from "./DarkModeToggle";
const StyledMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export default function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToogle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledMenu>
  );
}
