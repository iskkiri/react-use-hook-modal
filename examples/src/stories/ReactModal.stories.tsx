import { useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider } from 'react-use-hook-modal';
import useReactModal from '@/hooks/useReactModal';

import '../styles/stories.css';

const meta = {
  title: 'Examples/ReactModal',
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
    const { openReactModal, closeReactModal } = useReactModal();

    const onOpenReactModal = useCallback(() => {
      openReactModal({
        title: 'React Modal',
        content: 'This is a React Modal',
        onClose: closeReactModal,
        onConfirm: () => {
          console.log('Confirmed');
          closeReactModal();
        },
      });
    }, [closeReactModal, openReactModal]);

    return (
      <button onClick={onOpenReactModal} className="open-button">
        Open React Modal
      </button>
    );
  },
};
