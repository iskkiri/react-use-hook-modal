import { lazy, useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider, useModal } from 'react-use-hook-modal';

import '../styles/stories.css';

const CustomModal = lazy(() => import('@/components/CustomModal'));

const meta = {
  title: 'Examples/CustomModal',
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
    const { open: openCustomModal } = useModal(CustomModal);

    const onOpenCustomModal = useCallback(async () => {
      setResult('Waiting for user...');

      const { confirmed } = await openCustomModal({
        title: 'Custom Modal',
        content: 'This is a Custom Modal',
      });

      if (confirmed) {
        setResult('User confirmed! ✅');
      } else {
        setResult('User cancelled! ❌');
      }
    }, [openCustomModal]);

    return (
      <div style={{ textAlign: 'center' }}>
        <button onClick={onOpenCustomModal} className="open-button">
          Open Custom Modal
        </button>

        <p style={{ marginTop: '20px', fontSize: '18px' }}>
          Result: <strong>{result}</strong>
        </p>
      </div>
    );
  },
};
