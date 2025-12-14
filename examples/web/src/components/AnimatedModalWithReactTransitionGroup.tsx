import { useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import type { InjectedProps } from 'react-use-hook-modal';

import '../styles/custom-modal.css';
import '../styles/animated-modal.css';

interface AnimatedModalWithReactTransitionGroupProps extends InjectedProps<{ confirmed: boolean }> {
  title: string;
  content: string;
}

export default function AnimatedModalWithReactTransitionGroup({
  isOpen,
  title,
  content,
  close,
}: AnimatedModalWithReactTransitionGroupProps) {
  const onClose = useCallback(() => {
    close({ result: { confirmed: false } });
  }, [close]);

  const onConfirm = useCallback(() => {
    close({ result: { confirmed: true } });
  }, [close]);

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="custom-modal-overlay">
        <div className="custom-modal">
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
    </CSSTransition>
  );
}
