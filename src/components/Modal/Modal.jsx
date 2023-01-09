import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClick }) => {
  return createPortal(
    <div className="modal__backdrop">
      <div className="modal__content">
        <button type="button" onClick={onClick}>
          X
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
