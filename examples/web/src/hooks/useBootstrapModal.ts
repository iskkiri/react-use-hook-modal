import { lazy } from 'react';
import { useModal } from 'react-use-hook-modal';

const BootstrapModal = lazy(() => import('@/components/BootstrapModal'));

export default function useBootstrapModal() {
  const { open: openBootstrapModal, close: closeBootstrapModal } = useModal(BootstrapModal);

  return { openBootstrapModal, closeBootstrapModal };
}
