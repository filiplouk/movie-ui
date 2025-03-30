import classes from "./Modal.module.scss";
import ReactDOM from "react-dom";
import { useRef } from "react";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";

type ModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  children: React.ReactNode;
  width?: string;
};

const Modal = ({ open, setOpen, width, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setOpen(false);
  };

  return ReactDOM.createPortal(
    <>
      {open && (
        <div
          className={`${classes.modal} ${
            open && classes.open
          } d-flex justify-center align-center w-100 h-100`}
          ref={modalRef}
        >
          <div
            className={`${classes.modalContent} bg-white d-flex flex-column align-end`}
            style={{ width: width }}
          >
            <a type="button" onClick={closeModal}>
              <Icon path={mdiClose} size="3rem" />
            </a>
            <div className="w-100 flex-grow-1 d-flex flex-column justify-center">
              {children}
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("portal-root") as HTMLElement
  );
};

export default Modal;
