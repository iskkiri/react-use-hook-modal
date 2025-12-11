import { useCallback, useContext, useMemo } from 'react';
import { ModalDispatchContext } from '../contexts/ModalContext';
import type {
  CloseModal,
  CloseModalOptions,
  DistributiveOmit,
  InjectedProps,
  InjectedPropsKeys,
  InferResult,
  OpenModal,
  OpenModalOptions,
  UseModalReturn,
} from '../types/modal';
import { nanoid } from '../utils/nanoid';

export default function useModal<TProps extends InjectedProps<InferResult<TProps>>>(
  Component: React.ComponentType<TProps>
): UseModalReturn<TProps, InferResult<TProps>> {
  type TResult = InferResult<TProps>;

  const { openModal, closeModal } = useContext(ModalDispatchContext);
  const key = useMemo(() => nanoid(), []);

  const close: CloseModal<TResult> = useCallback(
    (options?: CloseModalOptions<TResult>) => {
      const { key: eachKey, clearTime, result } = options ?? {};

      const validKey = typeof eachKey === 'string' || typeof eachKey === 'number' ? eachKey : key;

      closeModal({ key: validKey, clearTime, result });
    },
    [closeModal, key]
  );

  const open: OpenModal<TProps, TResult> = useCallback(
    (props?: DistributiveOmit<TProps, InjectedPropsKeys>, options?: OpenModalOptions) => {
      const modalKey = options?.key ?? key;
      const userProvidedProps = (props ?? {}) as TProps;

      return openModal<TProps, TResult>({
        Component,
        props: {
          ...userProvidedProps,
          isOpen: true,
          close: (options: CloseModalOptions<TResult>) => close({ ...options, key: modalKey }),
        },
        key: modalKey,
        portalTarget: options?.portalTarget,
      });
    },
    [Component, close, key, openModal]
  );

  return { open, close, key };
}
