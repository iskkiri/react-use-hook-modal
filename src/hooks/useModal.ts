import { useCallback, useContext, useMemo } from 'react';
import { ModalDispatchContext } from '../contexts/ModalContext';
import type { CloseModal, OpenModal, OpenModalOptions, UseModalReturn } from '../types/modal';
import { nanoid } from '../utils/nanoid';

export default function useModal<TProps extends { isOpen: boolean }>(
  Component: React.ComponentType<TProps>
): UseModalReturn<TProps> {
  const { openModal, closeModal } = useContext(ModalDispatchContext);
  const key = useMemo(() => nanoid(), []);

  const open: OpenModal<TProps> = useCallback(
    (props?: Omit<TProps, 'isOpen'>, options?: OpenModalOptions) => {
      openModal({
        Component,
        props,
        key: options?.key ?? key,
        portalTarget: options?.portalTarget,
      });
    },
    [Component, key, openModal]
  );

  const close: CloseModal = useCallback(
    (modalKey) => {
      const validKey =
        typeof modalKey === 'string' || typeof modalKey === 'number' ? modalKey : key;

      closeModal(validKey);
    },
    [closeModal, key]
  );

  return { open, close, key };
}
