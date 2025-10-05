import { AnimatePresence, motion } from 'framer-motion';

import '../styles/custom-modal.css';

interface AnimatedModalWithFramerMotionProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AnimatedModalWithFramerMotion({
  isOpen,
  title,
  content,
  onClose,
  onConfirm,
}: AnimatedModalWithFramerMotionProps) {
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
                Close
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
