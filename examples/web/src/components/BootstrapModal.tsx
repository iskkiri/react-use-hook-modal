import { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import type { InjectedProps } from 'react-use-hook-modal';
interface BootStarpModalProps extends InjectedProps<{ confirmed: boolean }> {
  title: string;
  content: string;
}

export default function BootstrapModal({ isOpen, title, content, close }: BootStarpModalProps) {
  const onClose = useCallback(() => {
    close({ result: { confirmed: false } });
  }, [close]);

  const onConfirm = useCallback(() => {
    close({ result: { confirmed: true } });
  }, [close]);

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
