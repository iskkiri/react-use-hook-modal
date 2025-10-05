import { useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider } from 'react-use-hook-modal';
import { TransitionGroup } from 'react-transition-group';
import useAnimatedModalWithReactTransitionGroup from '@/hooks/useAnimatedModalWithReactTransitionGroup';

import '../styles/stories.css';

const meta = {
  title: 'Examples/Animation',
  parameters: {
    layout: 'centered',
  },
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
    const {
      openAnimatedModalWithReactTransitionGroup,
      closeAnimatedModalWithReactTransitionGroup,
    } = useAnimatedModalWithReactTransitionGroup();

    const onOpenAnimatedModal = useCallback(() => {
      openAnimatedModalWithReactTransitionGroup({
        title: 'Animated Modal (React Transition Group)',
        content: 'Note: TransitionGroup must be set as the container for ModalProvider.',
        onClose: closeAnimatedModalWithReactTransitionGroup,
        onConfirm: () => {
          console.log('Confirmed');
          closeAnimatedModalWithReactTransitionGroup();
        },
      });
    }, [closeAnimatedModalWithReactTransitionGroup, openAnimatedModalWithReactTransitionGroup]);

    return (
      <button onClick={onOpenAnimatedModal} className="open-button">
        Open Animated Modal (React Transition Group)
      </button>
    );
  },
};
