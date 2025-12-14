import React from 'react';
import { ModalDispatchContext, ModalStateContext } from '../contexts/ModalContext';
import type { ModalState } from '../types/modal';
import type { Mock } from 'vitest';

export const modals = [
  {
    Component: ({ message }: { message: string }) => <div>{message}</div>,
    props: { message: 'Hello World' },
    key: 'modal1',
    portalTarget: null,
  },
];

export const ModalStateProviderWrapper = (modals: ModalState[]) => {
  const ModalStateProvider = ({ children }: { children: React.ReactNode }) => (
    <ModalStateContext.Provider value={{ modals }}>{children}</ModalStateContext.Provider>
  );

  ModalStateProvider.displayName = 'ModalStateProvider';
  return ModalStateProvider;
};

export const ModalDispatchProviderWrapper = (
  openModal: Mock,
  closeModal: Mock,
  updateModal: Mock,
  clearModals: Mock
) => {
  const ModalDispatchProvider = ({ children }: { children: React.ReactNode }) => (
    <ModalDispatchContext.Provider value={{ openModal, closeModal, updateModal, clearModals }}>
      {children}
    </ModalDispatchContext.Provider>
  );

  ModalDispatchProvider.displayName = 'ModalDispatchProvider';
  return ModalDispatchProvider;
};
