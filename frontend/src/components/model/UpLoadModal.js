import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadButton from '../Navigation/UploadButton';
function UploadFormModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Upload</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
        <UploadButton setShowModal = {setShowModal } />
        </Modal>
      )}
    </>
  );
}
export default UploadFormModal;
