import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  z-index: 1001;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 1.2rem;
  right: 1.6rem;
  cursor: pointer;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, name }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: (e) => {
      if (children.props.onClick) children.props.onClick(e);
      open(name);
    },
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (openName !== name) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <CloseButton onClick={close}>
          <HiXMark />
        </CloseButton>
        {cloneElement(children, { onCloseModal: close })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
