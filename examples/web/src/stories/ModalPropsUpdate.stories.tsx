import { lazy, useCallback, useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider, useModal } from 'react-use-hook-modal';

import '../styles/stories.css';

const ExtendedDialog = lazy(() => import('@/components/ExtendedDialog'));

// Simulates a mutation hook similar to tanstack-query's useMutation
function useMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>
) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateAsync = useCallback(
    async (variables: TVariables): Promise<TData> => {
      setIsPending(true);
      setError(null);
      try {
        const result = await mutationFn(variables);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        throw err;
      } finally {
        setIsPending(false);
      }
    },
    [mutationFn]
  );

  return { mutateAsync, isPending, error };
}

// Fake API call that takes 2 seconds
const fakeDeleteItem = async (itemId: string): Promise<void> => {
  console.log(`Deleting item: ${itemId}`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

const meta = {
  title: 'Examples/ModalPropsUpdate',
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
    const { open, update } = useModal(ExtendedDialog);
    const { mutateAsync, isPending } = useMutation(fakeDeleteItem);

    // Update modal props when isPending changes
    useEffect(() => {
      update({ isPending });
    }, [isPending, update]);

    const handleDelete = useCallback(async () => {
      setResult('Waiting for user...');

      const { confirmed } = await open({
        title: 'Delete Item',
        content:
          'Are you sure you want to delete this item?\nThis will take 2 seconds to process.',
        confirmText: 'Delete',
        confirmColor: 'error',
        isPending,
        onConfirm: () => mutateAsync('item-123'),
      });

      if (confirmed) {
        setResult('Item deleted successfully!');
      } else {
        setResult('Deletion cancelled!');
      }
    }, [open, isPending, mutateAsync]);

    return (
      <div style={{ textAlign: 'center' }}>
        <button onClick={handleDelete} className="open-button">
          Delete Item
        </button>

        <p style={{ marginTop: '20px', fontSize: '18px' }}>
          Result: <strong>{result}</strong>
        </p>

        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          Click "Delete" to see the button disabled during the async operation
        </p>
      </div>
    );
  },
};
