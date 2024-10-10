import { lazy } from 'react';
import { useModal } from 'react-use-hook-modal';

const ChakraModal = lazy(() => import('@/components/ChakraModal'));

export default function useChakraModal() {
  const { open: openChakraModal, close: closeChakraModal } = useModal(ChakraModal);

  return { openChakraModal, closeChakraModal };
}
