import { useContext } from 'react';
import { ModalStateContext } from '../contexts/ModalContext';

export default function useModalsState() {
  const context = useContext(ModalStateContext);

  if (context === null) {
    throw new Error(
      'ModalProvider is missing or useModalsState must be called within a ModalProvider. Please ensure that your component is wrapped within <ModalProvider>.'
    );
  }

  return context;
}
