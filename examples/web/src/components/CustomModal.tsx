import { useCallback } from 'react';
import '../styles/custom-modal.css';
import type { InjectedProps } from 'react-use-hook-modal';

interface CustomModalProps extends InjectedProps<{ confirmed: boolean }> {
  title: string;
  content: string;
  style?: React.CSSProperties;
}

export default function CustomModal({ isOpen, title, content, style, close }: CustomModalProps) {
  const onClose = useCallback(() => {
    close({ result: { confirmed: false } });
  }, [close]);

  const onConfirm = useCallback(() => {
    close({ result: { confirmed: true } });
  }, [close]);

  return (
    <>
      {isOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal" style={style}>
            <h1>{title}</h1>

            <p>{content}</p>

            <div className="custom-button-container">
              <button className="close-button" onClick={onClose}>
                Cancel
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
