import { lazy } from 'react';
import { useModal } from 'react-use-hook-modal';

const CustomModal = lazy(() => import('@/components/CustomModal'));

export default function useCustomModal() {
  const { isInitialized, open: openCustomModal, close: closeCustomModal } = useModal(CustomModal);

  return { isInitialized, openCustomModal, closeCustomModal };
}
