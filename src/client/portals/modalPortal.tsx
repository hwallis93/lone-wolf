import { FC, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

const ModalPortal: FC<Props> = ({ children }) => {
  const modalElement = useRef(document.createElement('div'));

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');

    modalRoot?.appendChild(modalElement.current);

    return () => {
      modalRoot?.removeChild(modalElement.current);
    };
  }, []);

  return createPortal(
    children,
    modalElement.current,
  );
}

export default ModalPortal;
