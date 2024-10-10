import { lazy } from 'react';
import { useModal } from 'react-use-hook-modal';

const CustomModal = lazy(() => import('@/components/CustomModal'));

export default function useCustomModal() {
  const { open: openCustomModal, close: closeCustomModal } = useModal(CustomModal);

  return { openCustomModal, closeCustomModal };
}
