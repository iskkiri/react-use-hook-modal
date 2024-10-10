import { useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider } from 'react-use-hook-modal';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import useMaterialDialog from '@/hooks/useMaterialDialog';
import { Button } from '@mui/material';

const theme = createTheme();

const meta = {
  title: 'Examples/MaterialDialog',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <ModalProvider>
            <Story />
          </ModalProvider>
        </ThemeProvider>
      );
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: function Render() {
    const { openMaterialDialog, closeMaterialDialog } = useMaterialDialog();

    const onOpenChakraModal = useCallback(() => {
      openMaterialDialog({
        title: 'Material Dialog',
        content: 'This is a Material Dialog',
        onClose: closeMaterialDialog,
        onConfirm: () => {
          console.log('Confirmed');
          closeMaterialDialog();
        },
      });
    }, [closeMaterialDialog, openMaterialDialog]);

    return <Button onClick={onOpenChakraModal}>Open Material Dialog</Button>;
  },
};
