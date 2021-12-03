import { FC, KeyboardEventHandler, ReactNode } from "react";
import ModalPortal from "../portals/modalPortal";

import "./modal.css";

interface Props {
  title: string;
  onClose?: () => void;
  children: ReactNode;
}

const Modal: FC<Props> = ({ title, onClose, children }) => (
  <ModalPortal>
    <div
      className="Modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ModalTitle"
    >
      <header>
        <h1 id="ModalTitle">{title}</h1>
        <button className="primary" onClick={onClose}>✖</button>
      </header>
      <section>
        {children}
      </section>
    </div>
  </ModalPortal>
);

export default Modal;
