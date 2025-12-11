import { useContext } from 'react';
import { ModalDispatchContext } from '../contexts/ModalContext';

export default function useClearModals() {
  const { clearModals } = useContext(ModalDispatchContext);

  return { clearModals };
}
