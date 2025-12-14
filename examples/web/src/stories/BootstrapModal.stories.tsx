import { lazy, useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider, useModal } from 'react-use-hook-modal';
import { Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const BootstrapModal = lazy(() => import('@/components/BootstrapModal'));

const meta = {
  title: 'Examples/BootstrapModal',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <ModalProvider>
          <Story />
        </ModalProvider>
      );
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: function Render() {
    const [result, setResult] = useState('No result yet');
    const { open: openBootstrapModal } = useModal(BootstrapModal);

    const onOpenBootstrapModal = useCallback(async () => {
      setResult('Waiting for user...');

      const { confirmed } = await openBootstrapModal({
        title: 'Bootstrap Modal',
        content: 'This is a Bootstrap Modal',
      });

      if (confirmed) {
        setResult('User confirmed! ✅');
      } else {
        setResult('User cancelled! ❌');
      }
    }, [openBootstrapModal]);

    return (
      <div style={{ textAlign: 'center' }}>
        <Button onClick={onOpenBootstrapModal}>Open Bootstrap Modal</Button>

        <p style={{ marginTop: '20px', fontSize: '18px' }}>
          Result: <strong>{result}</strong>
        </p>
      </div>
    );
  },
};
