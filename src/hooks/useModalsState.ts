import { useContext } from 'react';
import { ModalStateContext } from '../contexts/ModalContext';

export default function useModalsState() {
  return useContext(ModalStateContext);
}
