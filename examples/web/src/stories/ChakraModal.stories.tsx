import { lazy, useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ChakraProvider } from '@chakra-ui/react';
import { ModalProvider, useModal } from 'react-use-hook-modal';

const ChakraModal = lazy(() => import('@/components/ChakraModal'));

const meta = {
  title: 'Examples/ChakraModal',
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
    const [result, setResult] = useState('No result yet');
    const { open: openChakraModal } = useModal(ChakraModal);

    const onOpenChakraModal = useCallback(async () => {
      setResult('Waiting for user...');

      const { confirmed } = await openChakraModal({
        title: 'Chakra Modal',
        content: 'This is a Chakra Modal',
      });

      if (confirmed) {
        setResult('User confirmed! ✅');
      } else {
        setResult('User cancelled! ❌');
      }
    }, [openChakraModal]);

    return (
      <div style={{ textAlign: 'center' }}>
        <Button onClick={onOpenChakraModal}>Open Chakra Modal</Button>

        <p style={{ marginTop: '20px', fontSize: '18px' }}>
          Result: <strong>{result}</strong>
        </p>
      </div>
    );
  },
};
