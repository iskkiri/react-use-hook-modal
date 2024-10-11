import { createContext } from 'react';
import type { ModalDispatchContextType, ModalStateContextType } from '../types/modal';

export const ModalStateContext = createContext<ModalStateContextType>({
  modals: [],
});

export const ModalDispatchContext = createContext<ModalDispatchContextType>({
  openModal: () => {
    throw new Error(
      'ModalProvider is missing. Please wrap your component tree with <ModalProvider>.'
    );
  },
  closeModal: () => {
    throw new Error(
      'ModalProvider is missing. Please wrap your component tree with <ModalProvider>.'
    );
  },
});
