import { useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider } from 'react-use-hook-modal';
import { Button } from 'react-bootstrap';
import useBootstrapModal from '@/hooks/useBootstrapModal';

import 'bootstrap/dist/css/bootstrap.min.css';

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
    const { openBootstrapModal, closeBootstrapModal } = useBootstrapModal();

    const onOpenBootstrapModal = useCallback(() => {
      openBootstrapModal({
        title: 'Bootstrap Modal',
        content: 'This is a Bootstrap Modal',
        onClose: closeBootstrapModal,
        onConfirm: () => {
          console.log('Confirmed');
          closeBootstrapModal();
        },
      });
    }, [closeBootstrapModal, openBootstrapModal]);

    return <Button onClick={onOpenBootstrapModal}>Open Bootstrap Modal</Button>;
  },
};
