import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClick }) => {
  console.log(modalRoot);

  const onEsc = e => {
    if ((e.node = 'ESC')) {
      console.log('Esc');
    }
  };

  return createPortal(
    <div className="modal__backdrop" onKeyDown={onEsc}>
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
