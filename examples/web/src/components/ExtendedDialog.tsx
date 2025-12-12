import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { InjectedProps } from 'react-use-hook-modal';

type ButtonVariant = 'text' | 'outlined' | 'contained';
type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

interface ExtendedDialogProps extends InjectedProps<{ confirmed: boolean }> {
  title: string;
  content: string;
  cancelText?: string;
  confirmText?: string;
  cancelVariant?: ButtonVariant;
  confirmVariant?: ButtonVariant;
  cancelColor?: ButtonColor;
  confirmColor?: ButtonColor;
  isPending?: boolean;
  onConfirm?: () => void | Promise<void>;
}

export default function ExtendedDialog({
  isOpen,
  title,
  content,
  close,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  cancelVariant = 'text',
  confirmVariant = 'contained',
  cancelColor = 'inherit',
  confirmColor = 'primary',
  isPending = false,
  onConfirm,
}: ExtendedDialogProps) {
  const handleClose = useCallback(() => {
    close({ result: { confirmed: false } });
  }, [close]);

  const handleConfirm = useCallback(async () => {
    if (onConfirm) {
      await onConfirm();
    }
    close({ result: { confirmed: true } });
  }, [close, onConfirm]);

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        fullWidth
      >
        <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant={cancelVariant}
            color={cancelColor}
            onClick={handleClose}
            disabled={isPending}
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            color={confirmColor}
            onClick={handleConfirm}
            disabled={isPending}
            autoFocus
          >
            {isPending ? 'Processing...' : confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
