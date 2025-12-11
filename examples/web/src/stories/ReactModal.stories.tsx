import { lazy, useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider, useModal } from 'react-use-hook-modal';

import '../styles/stories.css';

const ReactModal = lazy(() => import('@/components/ReactModal'));

const meta = {
  title: 'Examples/ReactModal',
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
    const { open: openReactModal } = useModal(ReactModal);

    const onOpenReactModal = useCallback(async () => {
      setResult('Waiting for user...');

      const { confirmed } = await openReactModal({
        title: 'React Modal',
        content: 'This is a React Modal',
      });

      if (confirmed) {
        setResult('User confirmed! ✅');
      } else {
        setResult('User cancelled! ❌');
      }
    }, [openReactModal]);

    return (
      <div style={{ textAlign: 'center' }}>
        <button onClick={onOpenReactModal} className="open-button">
          Open React Modal
        </button>

        <p style={{ marginTop: '20px', fontSize: '18px' }}>
          Result: <strong>{result}</strong>
        </p>
      </div>
    );
  },
};
