import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClick }) => {
  console.log(modalRoot);

  return createPortal(
    <div className="modal__backdrop">
      <div className="modal__content">
        <button type="button" onClick={onClick}>
          Close
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
