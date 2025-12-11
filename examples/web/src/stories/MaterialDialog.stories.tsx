import { lazy, useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider, useModal } from 'react-use-hook-modal';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Button } from '@mui/material';

const MaterialDialog = lazy(() => import('@/components/MaterialDialog'));

const theme = createTheme();

const meta = {
  title: 'Examples/MaterialDialog',
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
    const [result, setResult] = useState('No result yet');
    const { open: openMaterialDialog } = useModal(MaterialDialog);

    const onOpenMaterialDialog = useCallback(async () => {
      setResult('Waiting for user...');

      const { confirmed } = await openMaterialDialog({
        title: 'Material Dialog',
        content: 'This is a Material Dialog',
      });

      if (confirmed) {
        setResult('User confirmed! ✅');
      } else {
        setResult('User cancelled! ❌');
      }
    }, [openMaterialDialog]);

    return (
      <div style={{ textAlign: 'center' }}>
        <Button onClick={onOpenMaterialDialog}>Open Material Dialog</Button>

        <p style={{ marginTop: '20px', fontSize: '18px' }}>
          Result: <strong>{result}</strong>
        </p>
      </div>
    );
  },
};
