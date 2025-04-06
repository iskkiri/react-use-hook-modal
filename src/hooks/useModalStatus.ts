import { useContext, useMemo } from 'react';
import { ModalStateContext } from '../contexts/ModalContext';
import type { ModalKey } from '../types/modal';

interface UseModalStatusParams {
  key: ModalKey;
}

/**
 * Hook for monitoring modal's open/close status
 * Only tracks the modal state without providing control methods
 */
export default function useModalStatus({ key }: UseModalStatusParams) {
  const context = useContext(ModalStateContext);

  if (context === null) {
    throw new Error(
      'ModalProvider is missing or useModalStatus must be called within a ModalProvider. Please ensure that your component is wrapped within <ModalProvider>.'
    );
  }

  const isOpen: boolean = useMemo(() => {
    const modal = context.modals.find((modal) => modal.key === key);

    return modal?.props.isOpen ?? false;
  }, [context.modals, key]);

  return { isOpen };
}
