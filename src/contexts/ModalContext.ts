import { createContext } from 'react';
import type { ModalDispatchContextType, ModalStateContextType } from '../types/modal';

export const ModalStateContext = createContext<ModalStateContextType | null>(null);

export const ModalDispatchContext = createContext<ModalDispatchContextType>({
  openModal: () => {
    throw new Error(
      'ModalProvider is missing or useModal must be called within a ModalProvider. Please ensure that your component is wrapped within <ModalProvider>.'
    );
  },
  closeModal: () => {
    throw new Error(
      'ModalProvider is missing or useModal must be called within a ModalProvider. Please ensure that your component is wrapped within <ModalProvider>.'
    );
  },
  updateModal: () => {
    throw new Error(
      'ModalProvider is missing or useModal must be called within a ModalProvider. Please ensure that your component is wrapped within <ModalProvider>.'
    );
  },
  clearModals: () => {
    throw new Error(
      'ModalProvider is missing or useModal must be called within a ModalProvider. Please ensure that your component is wrapped within <ModalProvider>.'
    );
  },
});
