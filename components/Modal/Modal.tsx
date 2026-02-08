"use client";

import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from 'react';

type ModalProps = {
  children: React.ReactNode;
  closeModal: () => void;
};

const Modal = ({ children, closeModal }: ModalProps) => {

const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
	  const handleKeyDown = (e: KeyboardEvent) => {
	    if (e.key === "Escape") {
	      closeModal();
	    }
	  };
	
	  document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
	
	  return () => {
	    document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
	  };
	}, [closeModal]);

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>
        {children}
      </div>
    </div>, 
    document.body
  );
};

export default Modal;