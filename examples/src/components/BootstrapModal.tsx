import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface BootStarpModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BootstrapModal({
  isOpen,
  title,
  content,
  onClose,
  onConfirm,
}: BootStarpModalProps) {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
