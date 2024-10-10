import { useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider } from 'react-use-hook-modal';

import '../styles/stories.css';
import useAnimatedModalWithFramerMotion from '@/hooks/useAnimatedModalWithFramerMotion';

const meta = {
  title: 'Examples/Animation',
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

export const FramerMotion: Story = {
  render: function Render() {
    const { openAnimatedModalWithFramerMotion, closeAnimatedModalWithFramerMotion } =
      useAnimatedModalWithFramerMotion();

    const onOpenAnimatedModalWithFramerMotion = useCallback(() => {
      openAnimatedModalWithFramerMotion({
        title: 'Animated Modal (Framer Motion)',
        content: 'This is an Animated Modal (Framer Motion)',
        onClose: closeAnimatedModalWithFramerMotion,
        onConfirm: () => {
          console.log('Confirmed');
          closeAnimatedModalWithFramerMotion();
        },
      });
    }, [closeAnimatedModalWithFramerMotion, openAnimatedModalWithFramerMotion]);

    return (
      <button onClick={onOpenAnimatedModalWithFramerMotion} className="open-button">
        Open Animated Modal (Framer Motion)
      </button>
    );
  },
};
