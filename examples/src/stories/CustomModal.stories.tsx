import { useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider } from 'react-use-hook-modal';
import useCustomModal from '@/hooks/useCustomModal';

const meta = {
  title: 'Examples/CustomModal',
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
    const { openCustomModal, closeCustomModal } = useCustomModal();

    const onOpenCustomModal = useCallback(() => {
      openCustomModal({
        title: 'Custom Modal',
        content: 'This is a Custom Modal',
        onClose: closeCustomModal,
        onConfirm: () => {
          console.log('Confirmed');
          closeCustomModal();
        },
      });
    }, [closeCustomModal, openCustomModal]);

    return (
      <button
        onClick={onOpenCustomModal}
        style={{
          padding: '10px 20px',
          background: '#007bff',
          color: '#fff',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Open Custom Modal
      </button>
    );
  },
};
