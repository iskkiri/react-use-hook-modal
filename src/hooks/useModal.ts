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
  UpdateModal,
  UseModalReturn,
} from '../types/modal';
import { nanoid } from '../utils/nanoid';

export default function useModal<TProps extends InjectedProps<InferResult<TProps>>>(
  Component: React.ComponentType<TProps>
): UseModalReturn<TProps, InferResult<TProps>> {
  type TResult = InferResult<TProps>;

  const { openModal, closeModal, updateModal } = useContext(ModalDispatchContext);
  const key = useMemo(() => nanoid(), []);

  const close: CloseModal<TResult> = useCallback(
    (options?: CloseModalOptions<TResult>) => {
      const { key: eachKey, clearTime, result } = options ?? {};

      closeModal({ key: eachKey ?? key, clearTime, result });
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

  const update: UpdateModal<TProps> = useCallback(
    (props, options) => {
      updateModal({ key: options?.key ?? key, props });
    },
    [key, updateModal]
  );

  return { open, close, update, key };
}
