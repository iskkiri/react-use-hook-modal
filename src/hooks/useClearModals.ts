import { useContext } from 'react';
import { ModalDispatchContext } from '../contexts/ModalContext';

export default function useClearModals() {
  return useContext(ModalDispatchContext);
}
