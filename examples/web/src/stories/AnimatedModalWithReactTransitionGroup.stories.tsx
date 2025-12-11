import { lazy, useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider, useModal } from 'react-use-hook-modal';
import { TransitionGroup } from 'react-transition-group';

import '../styles/stories.css';

const AnimatedModalWithReactTransitionGroup = lazy(
  () => import('@/components/AnimatedModalWithReactTransitionGroup')
);

const meta = {
  title: 'Examples/Animation',

  decorators: [
    (Story) => {
      return (
        /*************************************************************************
         * Note: TransitionGroup must be set as the container for ModalProvider. *
         *************************************************************************/
        <ModalProvider container={TransitionGroup}>
          <Story />
        </ModalProvider>
      );
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReactTransitionGroup: Story = {
  render: function Render() {
    const [result, setResult] = useState('No result yet');
    const { open: openAnimatedModalWithReactTransitionGroup } = useModal(
      AnimatedModalWithReactTransitionGroup
    );

    const onOpenAnimatedModalWithReactTransitionGroup = useCallback(async () => {
      setResult('Waiting for user...');

      const { confirmed } = await openAnimatedModalWithReactTransitionGroup({
        title: 'Animated Modal (React Transition Group)',
        content: 'Note: TransitionGroup must be set as the container for ModalProvider.',
      });

      if (confirmed) {
        setResult('User confirmed! ✅');
      } else {
        setResult('User cancelled! ❌');
      }
    }, [openAnimatedModalWithReactTransitionGroup]);

    return (
      <div style={{ textAlign: 'center' }}>
        <button onClick={onOpenAnimatedModalWithReactTransitionGroup} className="open-button">
          Open Animated Modal (React Transition Group)
        </button>

        <p style={{ marginTop: '20px', fontSize: '18px' }}>
          Result: <strong>{result}</strong>
        </p>
      </div>
    );
  },
};
