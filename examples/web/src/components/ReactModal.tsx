import { useCallback } from 'react';
import Modal from 'react-modal';
import type { InjectedProps } from 'react-use-hook-modal';

import '../styles/react-modal.css';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
};

interface ReactModalProps extends InjectedProps<{ confirmed: boolean }> {
  title: string;
  content: string;
}

export default function ReactModal({ title, content, isOpen, close }: ReactModalProps) {
  const onClose = useCallback(() => {
    close({ result: { confirmed: false } });
  }, [close]);

  const onConfirm = useCallback(() => {
    close({ result: { confirmed: true } });
  }, [close]);

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
          Cancel
        </button>

        <button className="confirm-button" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </Modal>
  );
}
