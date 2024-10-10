import Modal from 'react-modal';

import '../styles/react-modal.css';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
};

interface ReactModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ReactModal({
  title,
  content,
  isOpen,
  onClose,
  onConfirm,
}: ReactModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      closeTimeoutMS={150}
      className="react-modal"
    >
      <h1>{title}</h1>

      <p>{content}</p>

      <div className="button-container">
        <button className="close-button" onClick={onClose}>
          Close
        </button>

        <button className="confirm-button" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </Modal>
  );
}
