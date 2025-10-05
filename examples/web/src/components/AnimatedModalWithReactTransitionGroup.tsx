import { CSSTransition } from 'react-transition-group';

import '../styles/custom-modal.css';
import '../styles/animated-modal.css';

interface AnimatedModalWithReactTransitionGroupProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AnimatedModalWithReactTransitionGroup({
  isOpen,
  title,
  content,
  onClose,
  onConfirm,
}: AnimatedModalWithReactTransitionGroupProps) {
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
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
    </CSSTransition>
  );
}
