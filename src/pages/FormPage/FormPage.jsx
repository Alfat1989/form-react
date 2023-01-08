import { useState } from 'react';
// import { createPortal } from 'react-dom';
import Form from '../../components/Form/Form';
import Modal from '../../components/Modal/Modal';

const FormPage = () => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    console.log(open);
    setOpen(!open);
  };

  return (
    <>
      <button type="button" onClick={toggleModal}>
        Open form
      </button>
      {open && (
        <Modal
          children={<Form title={'Enter your details'} />}
          onClick={toggleModal}
        />
      )}
    </>
  );
};

export default FormPage;
