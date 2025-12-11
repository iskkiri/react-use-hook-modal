import { AnimatePresence, motion } from 'framer-motion';
import type { InjectedProps } from 'react-use-hook-modal';

import '../styles/custom-modal.css';
import { useCallback } from 'react';

interface AnimatedModalWithFramerMotionProps extends InjectedProps<{ confirmed: boolean }> {
  title: string;
  content: string;
}

export default function AnimatedModalWithFramerMotion({
  isOpen,
  title,
  content,
  close,
}: AnimatedModalWithFramerMotionProps) {
  const onClose = useCallback(() => {
    close({ result: { confirmed: false } });
  }, [close]);

  const onConfirm = useCallback(() => {
    close({ result: { confirmed: true } });
  }, [close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="custom-modal-overlay">
          <motion.div
            className="custom-modal"
            initial={{ opacity: 0, scale: 0.9, translate: '-50% -50%' }}
            animate={{ opacity: 1, scale: 1, translate: '-50% -50%' }}
            exit={{ opacity: 0, scale: 0.9, translate: '-50% -50%' }}
          >
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
