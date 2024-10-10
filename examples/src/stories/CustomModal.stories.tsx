import { useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider } from 'react-use-hook-modal';
import useCustomModal from '@/hooks/useCustomModal';

import '../styles/stories.css';

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
      <button onClick={onOpenCustomModal} className="open-button">
        Open Custom Modal
      </button>
    );
  },
};
