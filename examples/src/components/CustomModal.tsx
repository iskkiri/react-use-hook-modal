import '../styles/custom-modal.css';

interface CustomModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CustomModal({
  isOpen,
  title,
  content,
  onClose,
  onConfirm,
}: CustomModalProps) {
  return (
    <>
      {isOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h1>{title}</h1>

            <p>{content}</p>

            <div className="custom-button-container">
              <button className="close-button" onClick={onClose}>
                Close
              </button>

              <button className="confirm-button" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
