import { useCallback, useContext, useMemo } from 'react';
import { ModalDispatchContext } from '../contexts/ModalContext';
import type {
  CloseModal,
  DistributiveOmit,
  OpenModal,
  OpenModalOptions,
  UseModalReturn,
} from '../types/modal';
import { nanoid } from '../utils/nanoid';

export default function useModal<TProps extends { isOpen: boolean }>(
  Component: React.ComponentType<TProps>
): UseModalReturn<TProps> {
  const { openModal, closeModal } = useContext(ModalDispatchContext);
  const key = useMemo(() => nanoid(), []);

  const open: OpenModal<TProps> = useCallback(
    (props?: DistributiveOmit<TProps, 'isOpen'>, options?: OpenModalOptions) => {
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
    (options) => {
      const validKey =
        typeof options?.key === 'string' || typeof options?.key === 'number' ? options.key : key;

      closeModal({ key: validKey, clearTime: options?.clearTime });
    },
    [closeModal, key]
  );

  return { open, close, key };
}
