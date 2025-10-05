import { lazy } from 'react';
import { useModal } from 'react-use-hook-modal';

const MaterailDialog = lazy(() => import('@/components/MaterialDialog'));

export default function useMaterialDialog() {
  const { open: openMaterialDialog, close: closeMaterialDialog } = useModal(MaterailDialog);

  return { openMaterialDialog, closeMaterialDialog };
}
