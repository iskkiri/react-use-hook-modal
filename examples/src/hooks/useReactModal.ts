import { lazy } from 'react';
import { useModal } from 'react-use-hook-modal';

const ReactModal = lazy(() => import('@/components/ReactModal'));

export default function useReactModal() {
  const { open: openReactModal, close: closeReactModal } = useModal(ReactModal);

  return { openReactModal, closeReactModal };
}
