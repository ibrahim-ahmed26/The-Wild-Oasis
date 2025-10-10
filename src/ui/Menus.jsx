import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  top: calc(100% + 0.4rem);
  right: 0;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  list-style: none;
  margin: 0;
  padding: 0.4rem 0;
  z-index: 1000;
  pointer-events: auto;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 1rem 1.6rem;
  background: none;
  border: none;
  text-align: left;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: var(--color-grey-50);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-500);
  }
`;

const MenuContext = createContext();

export default function Menus({ children }) {
  const [openId, setOpenId] = useState("");

  const open = setOpenId;
  const close = () => setOpenId("");

  return (
    <MenuContext.Provider value={{ openId, open, close }}>
      {children}
    </MenuContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ id }) {
  const { openId, open, close } = useContext(MenuContext);

  function handleClick() {
    // e.stopPropagation();
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, close } = useContext(MenuContext);
  const ref = useOutsideClick(close);
  if (openId !== id) return null;
  return <StyledList ref={ref}>{children}</StyledList>;
}

function Button({ children, icon, onClick, disabled, ...props }) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled} {...props}>
        {icon && <span>{icon}</span>}
        {children}
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
