import { useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ChakraProvider } from '@chakra-ui/react';
import { ModalProvider } from 'react-use-hook-modal';
import useChakraModal from '@/hooks/useChakraModal';

const meta = {
  title: 'Examples/ChakraModal',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <ChakraProvider>
          <ModalProvider>
            <Story />
          </ModalProvider>
        </ChakraProvider>
      );
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: function Render() {
    const { openChakraModal, closeChakraModal } = useChakraModal();

    const onOpenChakraModal = useCallback(() => {
      openChakraModal({
        title: 'Chakra Modal',
        content: 'This is a Chakra Modal',
        onClose: closeChakraModal,
        onConfirm: () => {
          console.log('Confirmed');
          closeChakraModal();
        },
      });
    }, [closeChakraModal, openChakraModal]);

    return <Button onClick={onOpenChakraModal}>Open Chakra Modal</Button>;
  },
};
