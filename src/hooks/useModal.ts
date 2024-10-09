import { useCallback, useContext, useMemo } from 'react';
import { ModalDispatchContext, ModalInitializedContext } from '../contexts/ModalContext';
import type { CloseModal, OpenModal, OpenModalOptions, UseModalReturn } from '../types/modal';
import { nanoid } from '../utils/nanoid';

export default function useModal<TProps extends { isOpen: boolean }>(
  Component: React.ComponentType<TProps>
): UseModalReturn<TProps> {
  const { isInitialized } = useContext(ModalInitializedContext);
  const { openModal, closeModal } = useContext(ModalDispatchContext);
  const key = useMemo(() => nanoid(), []);

  const open: OpenModal<TProps> = useCallback(
    (props?: Omit<TProps, 'isOpen'>, options?: OpenModalOptions) => {
      if (!isInitialized) {
        throw new Error(
          'ModalProvider component is missing. Please wrap your component tree with ModalProvider.'
        );
      }

      openModal({
        Component,
        props,
        key: options?.key ?? key,
        portalTarget: options?.portalTarget,
      });
    },
    [Component, isInitialized, key, openModal]
  );

  const close: CloseModal = useCallback(
    (modalKey) => {
      if (!isInitialized) {
        throw new Error(
          'ModalProvider component is missing. Please wrap your component tree with ModalProvider.'
        );
      }

      const validKey =
        typeof modalKey === 'string' || typeof modalKey === 'number' ? modalKey : key;

      closeModal(validKey);
    },
    [closeModal, isInitialized, key]
  );

  return { isInitialized, open, close };
}
