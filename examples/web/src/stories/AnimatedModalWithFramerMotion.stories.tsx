import { lazy, useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider, useModal } from 'react-use-hook-modal';

import '../styles/stories.css';

const AnimatedModalWithFramerMotion = lazy(
  () => import('@/components/AnimatedModalWithFramerMotion')
);

const meta = {
  title: 'Examples/Animation',

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

export const FramerMotion: Story = {
  render: function Render() {
    const [result, setResult] = useState('No result yet');
    const { open: openAnimatedModalWithFramerMotion } = useModal(AnimatedModalWithFramerMotion);

    const onOpenAnimatedModalWithFramerMotion = useCallback(async () => {
      setResult('Waiting for user...');

      const { confirmed } = await openAnimatedModalWithFramerMotion({
        title: 'Animated Modal (Framer Motion)',
        content: 'This is an Animated Modal (Framer Motion)',
      });

      if (confirmed) {
        setResult('User confirmed! ✅');
      } else {
        setResult('User cancelled! ❌');
      }
    }, [openAnimatedModalWithFramerMotion]);

    return (
      <div style={{ textAlign: 'center' }}>
        <button onClick={onOpenAnimatedModalWithFramerMotion} className="open-button">
          Open Animated Modal (Framer Motion)
        </button>

        <p style={{ marginTop: '20px', fontSize: '18px' }}>
          Result: <strong>{result}</strong>
        </p>
      </div>
    );
  },
};
