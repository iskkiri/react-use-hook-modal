import { createContext } from 'react';
import type {
  ModalDispatchContextType,
  ModalInitializedContextType,
  ModalStateContextType,
} from '../types/modal';

export const ModalInitializedContext = createContext<ModalInitializedContextType>({
  isInitialized: false,
});

export const ModalStateContext = createContext<ModalStateContextType>({
  modals: [],
});

export const ModalDispatchContext = createContext<ModalDispatchContextType>({
  openModal: () => {},
  closeModal: () => {},
});
